//
//  TableViewDropDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/13.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TableViewDropDelegate: NSObject, UITableViewDropDelegate {
    
    func tableView(_ tableView: UITableView, performDropWith coordinator: UITableViewDropCoordinator) {
        guard let dataSource = tableView.dataSource as? CardDataSource else {return}
        let destinationIndexPath: IndexPath
        if let indexPath = coordinator.destinationIndexPath {
            destinationIndexPath = indexPath
        } else {
            let row = tableView.numberOfRows(inSection: 0)
            destinationIndexPath = IndexPath(row: row, section: 0)
        }
        
        for item in coordinator.items {
            if let sourceItemPath = item.sourceIndexPath {
                dataSource.moveItem(at: sourceItemPath.row, to: destinationIndexPath.row)
                DispatchQueue.main.async {
                    tableView.beginUpdates()
                    tableView.deleteRows(at: [sourceItemPath], with: .automatic)
                    tableView.insertRows(at: [destinationIndexPath], with: .automatic)
                    tableView.endUpdates()
                }
            }
        }
    }
    
    func tableView(_ tableView: UITableView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UITableViewDropProposal {
        return UITableViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
    }
    
}
