//
//  TaskTableViewDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/10.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TaskTableViewDelegate: NSObject, UITableViewDelegate {
    
//    var model: Category?
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { action, view, completionHandler in
            let taskDataSource = tableView.dataSource as? TaskDataSource
            taskDataSource?.model?.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
            completionHandler(true)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
}
