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
                NotificationCenter.default.post(name: .exchangeCellOnSameTableView,
                                                object: self,
                                                userInfo: ["sourceIndexPath" : sourceItemPath, "destinationIndexPath" : destinationIndexPath])
            } else if let dragObejct = item.dragItem.localObject as? DragObject {
                guard let sourceModel = dragObejct.dataSource.model else {return}
                let sourceIndexPath = dragObejct.indexPath
                dataSource.model?.insert(sourceModel.card(at: sourceIndexPath.row), at: destinationIndexPath.row)
                DispatchQueue.main.async {
                    tableView.insertRows(at: [destinationIndexPath], with: .automatic)
                    self.removeSourceTableData(object: dragObejct)
                }
            }
        }
    }
    
    func removeSourceTableData(object: Any?) {
        guard let dragObject = object as? DragObject else {return}
        dragObject.tableView.beginUpdates()
        dragObject.dataSource.model?.remove(at: dragObject.indexPath.row)
        dragObject.tableView.deleteRows(at: [dragObject.indexPath], with: .automatic)
        dragObject.tableView.endUpdates()
    }
    
    func tableView(_ tableView: UITableView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UITableViewDropProposal {
        return UITableViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
    }
}

extension Notification.Name {
    static let exchangeCellOnSameTableView = Notification.Name("exchangeCellOnSameTableView")
}
