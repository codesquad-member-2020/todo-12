//
//  TaskTableViewDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/10.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardTableViewDelegate: NSObject, UITableViewDelegate {
    
    var handler: (Int) -> () = {_ in}
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { _, _, _ in
            guard let cardDataSource = tableView.dataSource as? CardDataSource else {return}
            self.deleteModel(dataSource: cardDataSource, indexPath: indexPath, delay: 0)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
    
    func tableView(_ tableView: UITableView, contextMenuConfigurationForRowAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            
            guard let dataSource = tableView.dataSource as? CardDataSource else {return UIMenu(title: "")}
            
            let moveToDone = UIAction(title: "move to done") { _ in
                guard let card = dataSource.model?.card(at: indexPath.row) else {return}
                NotificationCenter.default.post(name: .moveToDone,
                                                object: self,
                                                userInfo: ["card" : card])
                self.deleteModel(dataSource: dataSource, indexPath: indexPath, delay: 0.7)
            }
            
            let edit = UIAction(title: "edit...") { _ in
                self.handler(indexPath.row)
            }
            
            let delete = UIAction(title: "delete", attributes: .destructive) { _ in
                self.deleteModel(dataSource: dataSource, indexPath: indexPath, delay: 0.7)
            }
            let menu = UIMenu(title: "", children: [moveToDone, edit, delete])
            
            return menu
        }
        return configuration
    }
    
    func deleteModel(dataSource: CardDataSource, indexPath: IndexPath, delay: Double) {
        DispatchQueue.main.asyncAfter(deadline: .now() + delay){
            dataSource.model?.remove(at: indexPath.row)
            NotificationCenter.default.post(name: .deleteIndexPath,
                                            object: self,
                                            userInfo: ["indexPath" : indexPath])
        }
    }
}

extension Notification.Name {
    static let moveToDone = Notification.Name("moveToDone")
    static let deleteIndexPath = Notification.Name("deleteIndexPath")
}
