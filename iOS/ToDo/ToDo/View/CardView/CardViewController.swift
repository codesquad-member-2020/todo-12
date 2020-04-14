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
        let indexPath = IndexPath(row: cardTabelView.numberOfRows(inSection: 0), section: 0)
        
        editView.createHandler = {
            self.dataSource.category?.append(card: $0)
            self.cardTabelView.insertRows(at: [indexPath], with: .automatic)
        }
        self.present(editView, animated: true)
    }
    
    private let dataSource = CardDataSource()
    private let delegate = CardTableViewDelegate()
    private let dragDelegate = TableViewDragDelegate()
    private let dropDelegate = TableViewDropDelegate()
    private var category: Category? {
        didSet {
            dataSource.category = category
        }
    }
    
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
        dataSource.handler = {
            self.numOfCardsLabel.text = String(self.dataSource.category?.count ?? 0)
        }
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
                                               selector: #selector(deleteRow(_:)),
                                               name: .deleteIndexPath,
                                               object: delegate)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(startEditCard(_:)),
                                               name: .startEditCard,
                                               object: delegate)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(exchangeCellOnSametableView(_:)),
                                               name: .exchangeCellOnSameTableView,
                                               object: dropDelegate)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(exchangeCellOnDifferentTableView(_:)),
                                               name: .exchangeCellOnDifferentTableView,
                                               object: dropDelegate)
    }
    
    @objc func receiveModel(_ notification: Notification) {
        guard let category = notification.userInfo?["category"] as? Category else {return}
        self.category = category
    }
    
    @objc func deleteRow(_ notification: Notification) {
        guard let indexPath = notification.userInfo?["indexPath"] as? IndexPath else {return}
        cardTabelView.deleteRows(at: [indexPath], with: .automatic)
    }
    
    @objc func startEditCard(_ notification: Notification) {
        guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
        guard let editIndex = notification.userInfo?["editIndex"] as? Int else {return}
        
        editView.model = self.dataSource.category?.cards[editIndex]
        editView.editedModelIndex = editIndex
        editView.editHandler = {
            self.dataSource.category?.cards[$0] = $1
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
