//
//  TaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardViewController: UIViewController, UITableViewDelegate {
    
    @IBOutlet weak var numOfCardsLabel: UILabel!
    @IBOutlet weak var cardTabelView: UITableView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var addCardButton: UIButton!
    @IBAction func addCardButtonPushed(_ sender: UIButton) {
        guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
        
        editView.createHandler = {
            self.categoryManager?.insertCard(card: $0)
        }
        self.present(editView, animated: true)
    }
    
    private let dataSource = CardDataSource()
    private let delegate = CardTableViewDelegate()
    private let dragDelegate = TableViewDragDelegate()
    private let dropDelegate = TableViewDropDelegate()
    private var categoryManager: CategoryManager?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
        setupTableView()
        setupTableViewDragAndDrop()
        setupNotification()
    }
    
    func setupTableView() {
        cardTabelView.dataSource = dataSource
        cardTabelView.delegate = delegate
    }
    
    func setupTableViewDragAndDrop() {
        cardTabelView.dragDelegate = dragDelegate
        cardTabelView.dropDelegate = dropDelegate
        cardTabelView.dragInteractionEnabled = true
    }
    
    func setupNotification() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(receiveModel(_:)),
                                               name: .distributeModel,
                                               object: self)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(removeCard(_:)),
                                               name: .postWillRemoveIndex,
                                               object: delegate)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateFromDeletion(_:)),
                                               name: .postRemovedIndex,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateNumOfCardsLabel),
                                               name: .cardChanged,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(postMoveToDoneCard(_:)),
                                               name: .postWillmoveToDoneIndex,
                                               object: delegate)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(insertCard(_:)),
                                               name: .cardInserted,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateFromInsertion(_:)),
                                               name: .postInsertedIndex,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(postWillEditIndex(_:)),
                                               name: .postWillEditIndex,
                                               object: delegate)
        //        NotificationCenter.default.addObserver(self,
        //                                               selector: #selector(exchangeCellOnSametableView(_:)),
        //                                               name: .exchangeCellOnSameTableView,
        //                                               object: dropDelegate)
        //        NotificationCenter.default.addObserver(self,
        //                                               selector: #selector(exchangeCellOnDifferentTableView(_:)),
        //                                               name: .exchangeCellOnDifferentTableView,
        //                                               object: dropDelegate)
    }
    
    @objc func updateFromInsertion(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.id else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        let indexPath = IndexPath(row: index, section: 0)
        cardTabelView.insertRows(at: [indexPath], with: .automatic)
    }
    
    @objc func insertCard(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.id else {return}
        guard let card = notification.userInfo?["card"] as? Card else {return}
        categoryManager?.insertCard(card: card)
    }
    
    @objc func postMoveToDoneCard(_ notification: Notification) {
        guard let index = notification.userInfo?["index"] as? Int else {return}
        guard let card = categoryManager?.card(at: index) else {return}
        NotificationCenter.default.post(name: .postMoveToDoneCard,
                                        object: nil,
                                        userInfo: ["card" : card])
    }
    
    @objc func updateNumOfCardsLabel() {
        guard let count = categoryManager?.count else {return}
        DispatchQueue.main.async {
            self.numOfCardsLabel.text = String(count)
        }
    }
    
    @objc func updateFromDeletion(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.id else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        let indexPath = IndexPath(row: index, section: 0)
        cardTabelView.deleteRows(at: [indexPath], with: .automatic)
    }
    
    @objc func receiveModel(_ notification: Notification) {
        guard let category = notification.userInfo?["category"] as? Category else {return}
        self.categoryManager = CategoryManager(category: category)
        dataSource.setCardManager(cardManager: categoryManager?.cardManager)
        updateNumOfCardsLabel()
    }
    
    @objc func removeCard(_ notification: Notification) {
        guard let index = notification.userInfo?["index"] as? Int else {return}
        categoryManager?.removeCard(at: index)
    }
    
    @objc func postWillEditIndex(_ notification: Notification) {
        guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        
        editView.model = categoryManager?.card(at: index)
        editView.editedModelIndex = index
        editView.editHandler = {
            self.categoryManager?.updateCard($1, at: $0)
            self.cardTabelView.reloadData()
        }
        self.present(editView, animated: true)
    }
    
    @objc func exchangeCellOnSametableView(_ notification: Notification) {
        guard let sourceIndexPath = notification.userInfo?["sourceIndexPath"] as? IndexPath, let destinationIndexPath = notification.userInfo?["destinationIndexPath"] as? IndexPath else {return}
        
        DispatchQueue.main.async {
            self.cardTabelView.beginUpdates()
            self.cardTabelView.deleteRows(at: [sourceIndexPath], with: .automatic)
            self.cardTabelView.insertRows(at: [destinationIndexPath], with: .automatic)
            self.cardTabelView.endUpdates()
        }
    }
    
    @objc func exchangeCellOnDifferentTableView(_ notification: Notification) {
        guard let dragObject = notification.userInfo?["dragObject"] as? DragObject else {return}
        guard let destinationIndexPath = notification.userInfo?["destinationIndexPath"] as? IndexPath else {return}
        DispatchQueue.main.async {
            self.cardTabelView.insertRows(at: [destinationIndexPath], with: .automatic)
            dragObject.tableView.beginUpdates()
            dragObject.tableView.deleteRows(at: [dragObject.indexPath], with: .automatic)
            dragObject.tableView.endUpdates()
        }
    }
    
    private func setLabelRadius() {
        let superViewHeight = numOfCardsLabel.superview?.layer.frame.height ?? 0
        numOfCardsLabel.clipsToBounds = true
        numOfCardsLabel.layer.cornerRadius = superViewHeight * 0.24
    }
}

extension Notification.Name {
    static let postMoveToDoneCard = Notification.Name("postMoveToDoneCard")
}
