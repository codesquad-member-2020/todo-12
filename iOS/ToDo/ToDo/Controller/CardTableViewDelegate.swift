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
            self.postWillRemoveIndex(indexPath: indexPath, delay: 0)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
    
    func tableView(_ tableView: UITableView, contextMenuConfigurationForRowAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            let moveToDone = UIAction(title: "move to done") { _ in
                NotificationCenter.default.post(name: .postWillmoveToDoneIndex,
                                                object: self,
                                                userInfo: ["index" : indexPath.row])
                self.postWillRemoveIndex(indexPath: indexPath, delay: 0.7)
            }

            let edit = UIAction(title: "edit...") { _ in
                NotificationCenter.default.post(name: .postWillEditIndex,
                                                object: self,
                                                userInfo: ["index" : indexPath.row])
            }

            let delete = UIAction(title: "delete", attributes: .destructive) { _ in
//                self.deleteModel(dataSource: dataSource, indexPath: indexPath, delay: 0.7)
            }
            let menu = UIMenu(title: "", children: [moveToDone, edit, delete])

            return menu
        }
        return configuration
    }
    
    func postWillRemoveIndex(indexPath: IndexPath, delay: Double) {
        DispatchQueue.main.asyncAfter(deadline: .now() + delay){
            NotificationCenter.default.post(name: .postWillRemoveIndex,
                                            object: self,
                                            userInfo: ["index" : indexPath.row])
        }
    }
}

extension Notification.Name {
    static let postWillmoveToDoneIndex = Notification.Name("postWillmoveToDoneIndex")
    static let postWillRemoveIndex = Notification.Name("postWillRemoveIndex")
    static let postWillEditIndex = Notification.Name("postWillEditIndex")
}
