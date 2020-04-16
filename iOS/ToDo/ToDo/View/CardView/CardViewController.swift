//
//  TaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardViewController: UIViewController {
    
    @IBOutlet weak var numOfCardsLabel: UILabel!
    @IBOutlet weak var cardTabelView: UITableView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var addCardButton: UIButton!
    @IBAction func addCardButtonPushed(_ sender: UIButton) {
        guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
        
        editView.createHandler = {
            guard let id = self.categoryManager?.categoryId else {return}
            let json = ["title" : $0, "content" : $1]
            let encoder = JSONEncoder()
            var body = Data()
            do {
                body = try encoder.encode(json)
            } catch {
                
            }
            
            NetworkConnection.request(httpMethod: .POST, quertString: "card/\(id)", httpBody: body, errorHandler: {}) {
                let decoder = JSONDecoder()
                decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
                do {
                    let card = try decoder.decode(Card.self, from: $0)
                    self.categoryManager?.insertCard(card: card)
                } catch{
                    
                }
            }
        }
        self.present(editView, animated: true)
    }
    
    private let dataSource = CardDataSource()
    private var categoryManager: CategoryManager?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupLabelRadius()
        setupTableView()
        setupTableViewDragAndDrop()
        setupNotification()
    }
    
    public func setCategory(category: Category) {
        self.categoryManager = CategoryManager(category: category)
        dataSource.setCardManager(cardManager: categoryManager?.cardManager)
        updateNumOfCardsLabel()
    }
    
    private func setupLabelRadius() {
        let superViewHeight = numOfCardsLabel.superview?.layer.frame.height ?? 0
        numOfCardsLabel.clipsToBounds = true
        numOfCardsLabel.layer.cornerRadius = superViewHeight * 0.24
    }
    
    private func setupNotification() {
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(removeCard(_:)),
                                               name: .postWillRemoveIndex,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateFromDeletion(_:)),
                                               name: .postRemovedIndex,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateNumOfCardsLabel),
                                               name: .cardChanged,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(insertCard(_:)),
                                               name: .cardInserted,
                                               object: nil)
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(updateFromInsertion(_:)),
                                               name: .postInsertedIndex,
                                               object: nil)
    }
    
    private func setupTableView() {
        cardTabelView.dataSource = dataSource
        cardTabelView.delegate = self
    }
    
    private func setupTableViewDragAndDrop() {
        cardTabelView.dragDelegate = self
        cardTabelView.dropDelegate = self
        cardTabelView.dragInteractionEnabled = true
    }
    
    @objc func insertCard(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.categoryId else {return}
        guard let card = notification.userInfo?["card"] as? Card else {return}
        guard let index = notification.userInfo?["index"] as? Int else {
            categoryManager?.insertCard(card: card)
            return
        }
        categoryManager?.insertCard(card: card, at: index)
    }
    
    @objc func removeCard(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.categoryId else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        categoryManager?.removeCard(at: index)
    }
    
    @objc func updateFromDeletion(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.categoryId else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        let indexPath = IndexPath(row: index, section: 0)
        cardTabelView.deleteRows(at: [indexPath], with: .automatic)
    }
    
    @objc func updateFromInsertion(_ notification: Notification) {
        guard let id = notification.userInfo?["id"] as? Int else {return}
        guard id == categoryManager?.categoryId else {return}
        guard let index = notification.userInfo?["index"] as? Int else {return}
        let indexPath = IndexPath(row: index, section: 0)
        DispatchQueue.main.async {
            self.cardTabelView.insertRows(at: [indexPath], with: .automatic)
        }
    }
    
    @objc func updateNumOfCardsLabel() {
        guard let count = categoryManager?.count else {return}
        DispatchQueue.main.async {
            self.numOfCardsLabel.text = String(count)
        }
    }
}

struct CardInfo {
    var indexPath: IndexPath
    var categoryId: Int
    var card: Card
}
typealias DragAndDropObject = (willRemove: CardInfo, willInsert: CardInfo?)

extension CardViewController: UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { _, _, _ in
            guard let id = self.categoryManager?.card(at: indexPath.row).id else {return}
            NetworkConnection.request(httpMethod: .DELETE, quertString: "card/\(id)", httpBody: nil, errorHandler: {}) {
                guard let result = String(data: $0, encoding: .utf8) else {return}
                if result == "OK" {
                    self.removeCard(indexPath: indexPath, delay: 0)
                }
            }
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
    
    func tableView(_ tableView: UITableView, contextMenuConfigurationForRowAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            let moveToDone = UIAction(title: "move to done") { _ in
                guard let card = self.categoryManager?.card(at: indexPath.row) else {return}
                guard let id = self.categoryManager?.categoryId else {return}
                let object: DragAndDropObject = (willRemove: CardInfo(indexPath: indexPath, categoryId: id, card: card) , willInsert: nil)
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.7){
                        NotificationCenter.default.post(name: .postWillExchangeIndexOnDifferentCategory,
                                                        object: nil,
                                                        userInfo: ["object" : object])
                }
            }
            
            let edit = UIAction(title: "edit...") { _ in
                guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
                let index = indexPath.row
                editView.model = self.categoryManager?.card(at: index)
                editView.editedModelIndex = index
                editView.editHandler = {
                    self.categoryManager?.updateCard($1, at: $0)
                    self.cardTabelView.reloadData()
                }
                self.present(editView, animated: true)
            }
            
            let delete = UIAction(title: "delete", attributes: .destructive) { _ in
                guard let id = self.categoryManager?.card(at: indexPath.row).id else {return}
                NetworkConnection.request(httpMethod: .DELETE, quertString: "card/\(id)", httpBody: nil, errorHandler: {}) {
                    guard let result = String(data: $0, encoding: .utf8) else {return}
                    if result == "OK" {
                        self.removeCard(indexPath: indexPath, delay: 0.7)
                    }
                }
            }
            let menu = UIMenu(title: "", children: [moveToDone, edit, delete])
            
            return menu
        }
        return configuration
    }
    
    func removeCard(indexPath: IndexPath, delay: Double) {
        DispatchQueue.main.asyncAfter(deadline: .now() + delay){
            self.categoryManager?.removeCard(at: indexPath.row)
        }
    }
}

extension CardViewController: UITableViewDragDelegate {
    
    func tableView(_ tableView: UITableView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem] {
        let itemProvider = NSItemProvider()
        let dragItem = UIDragItem(itemProvider: itemProvider)
        guard let id = categoryManager?.categoryId else {return []}
        guard let card = categoryManager?.card(at: indexPath.row) else {return []}
        dragItem.localObject = CardInfo(indexPath: indexPath, categoryId: id, card: card)
        return [dragItem]
    }
}

extension CardViewController: UITableViewDropDelegate {
    
    func tableView(_ tableView: UITableView, performDropWith coordinator: UITableViewDropCoordinator) {
        let destinationIndexPath: IndexPath
        if let indexPath = coordinator.destinationIndexPath {
            destinationIndexPath = indexPath
        } else {
            let row = tableView.numberOfRows(inSection: 0)
            destinationIndexPath = IndexPath(row: row, section: 0)
        }
        
        for item in coordinator.items {
            guard let categoryId = categoryManager?.categoryId else {return}
            if let sourceItemPath = item.sourceIndexPath {
                guard let cardId = categoryManager?.card(at: sourceItemPath.row).id else {return}
                
                DispatchQueue.main.async {
                    self.categoryManager?.moveItem(at: sourceItemPath.row, to: destinationIndexPath.row)
                }
                NetworkConnection.request(httpMethod: .PUT, quertString: "card/\(cardId)/move/\(categoryId)/\(destinationIndexPath.row)", httpBody: nil, errorHandler: {}) {
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
                    do {
                        let card = try decoder.decode(Card.self, from: $0)
                        guard destinationIndexPath.row == card.categoryKey else {
                            DispatchQueue.main.async {
                                self.categoryManager?.moveItem(at: sourceItemPath.row, to: destinationIndexPath.row)
                            }
                            return}
                    } catch {
                        DispatchQueue.main.async {
                            self.categoryManager?.moveItem(at: sourceItemPath.row, to: destinationIndexPath.row)
                        }
                    }
                }
                
            }
            else if let dragObject = item.dragItem.localObject as? CardInfo {
                let cardId = dragObject.card.id
                
                let object: DragAndDropObject = (willRemove: dragObject, willInsert: CardInfo(indexPath: destinationIndexPath, categoryId: categoryId, card: dragObject.card))
                NetworkConnection.request(httpMethod: .PUT, quertString: "card/\(cardId)/move/\(categoryId)/\(destinationIndexPath.row)", httpBody: nil, errorHandler: {}) {
                    let decoder = JSONDecoder()
                    decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
                    do {
                        let card = try decoder.decode(Card.self, from: $0)
                        guard destinationIndexPath.row == card.categoryKey else {return}
                        DispatchQueue.main.async {
                            NotificationCenter.default.post(name: .postWillExchangeIndexOnDifferentCategory,
                                                            object: nil,
                                                            userInfo: ["object" : object])
                        }
                    } catch {
                    }
                }
            }
        }
    }
    
    func tableView(_ tableView: UITableView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UITableViewDropProposal {
        return UITableViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
    }
}

extension Notification.Name {
    static let postWillExchangeIndexOnDifferentCategory = Notification.Name("postWillExchangeIndexOnDifferentCategory")
    static let postWillRemoveIndex = Notification.Name("postWillRemoveIndex")
}
