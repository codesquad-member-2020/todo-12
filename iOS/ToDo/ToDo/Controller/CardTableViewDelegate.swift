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
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { action, view, completionHandler in
            let taskDataSource = tableView.dataSource as? CardDataSource
            taskDataSource?.model?.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
            completionHandler(true)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
    
    func tableView(_ tableView: UITableView, contextMenuConfigurationForRowAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            
            let dataSource = tableView.dataSource as? CardDataSource
            
            let moveToDone = UIAction(title: "move to done") { _ in
                guard let card = dataSource?.model?.card(at: indexPath.row) else {return}
                NotificationCenter.default.post(name: .moveToDone,
                                                object: self,
                                                userInfo: ["card" : card])
                
                dataSource?.model?.remove(at: indexPath.row)
                tableView.deleteRows(at: [indexPath], with: .automatic)
            }
            
            let edit = UIAction(title: "edit...") { _ in
                self.handler(indexPath.row)
            }
            
            let delete = UIAction(title: "delete", attributes: .destructive) { _ in
                dataSource?.model?.remove(at: indexPath.row)
                tableView.deleteRows(at: [indexPath], with: .automatic)
            }
            let menu = UIMenu(title: "", children: [moveToDone, edit, delete])
            
            return menu
        }
        return configuration
    }
}

extension Notification.Name {
    static let moveToDone = Notification.Name("moveToDone")
}
