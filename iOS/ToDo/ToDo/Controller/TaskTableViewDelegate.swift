//
//  TaskTableViewDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/10.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TaskTableViewDelegate: NSObject, UITableViewDelegate {
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { action, view, completionHandler in
            let taskDataSource = tableView.dataSource as? TaskDataSource
            taskDataSource?.model?.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
            completionHandler(true)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
    
    func tableView(_ tableView: UITableView, contextMenuConfigurationForRowAt indexPath: IndexPath, point: CGPoint) -> UIContextMenuConfiguration? {
        let configuration = UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { _ in
            let moveToDone = UIAction(title: "move to done") { action in }
            let edit = UIAction(title: "edit...") { action in }
            let delete = UIAction(title: "delete", attributes: .destructive) { _ in
                let dataSource = tableView.dataSource as? TaskDataSource
                dataSource?.model?.remove(at: indexPath.row)
                tableView.deleteRows(at: [indexPath], with: .automatic)
            }
            let menu = UIMenu(title: "", children: [moveToDone, edit, delete])
            
            return menu
        }
        return configuration
    }
}
