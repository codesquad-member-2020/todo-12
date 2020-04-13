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
                moveItem(dataSource: dataSource,at: sourceItemPath.row, to: destinationIndexPath.row)
                NotificationCenter.default.post(name: .exchangeCellOnSameTableView,
                                                object: self,
                                                userInfo: ["sourceIndexPath" : sourceItemPath, "destinationIndexPath" : destinationIndexPath])
            } else if let dragObject = item.dragItem.localObject as? DragObject {
                guard let sourceModel = dragObject.dataSource.model else {return}
                let sourceIndexPath = dragObject.indexPath
                dataSource.model?.insert(sourceModel.card(at: sourceIndexPath.row), at: destinationIndexPath.row)
                dragObject.dataSource.model?.remove(at: dragObject.indexPath.row)
                NotificationCenter.default.post(name: .exchangeCellOnDifferentTableView,
                                                object: self,
                                                userInfo: ["dragObject" : dragObject, "destinationIndexPath" : destinationIndexPath])
            }
        }
    }
    
    func moveItem(dataSource: CardDataSource, at sourceIndex: Int, to destinationIndex: Int) {
        guard sourceIndex != destinationIndex else {return}
        guard let dragItem = dataSource.model?.card(at: sourceIndex) else {return}
        dataSource.model?.remove(at: sourceIndex)
        dataSource.model?.insert(dragItem, at: destinationIndex)
    }
    
    func tableView(_ tableView: UITableView, dropSessionDidUpdate session: UIDropSession, withDestinationIndexPath destinationIndexPath: IndexPath?) -> UITableViewDropProposal {
        return UITableViewDropProposal(operation: .move, intent: .insertAtDestinationIndexPath)
    }
}

extension Notification.Name {
    static let exchangeCellOnSameTableView = Notification.Name("exchangeCellOnSameTableView")
    static let exchangeCellOnDifferentTableView = Notification.Name("exchangeCellOnDifferentTableView")
}
