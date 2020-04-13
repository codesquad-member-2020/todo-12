//
//  TableViewDragDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/13.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TableViewDragDelegate: NSObject, UITableViewDragDelegate {

    func tableView(_ tableView: UITableView, itemsForBeginning session: UIDragSession, at indexPath: IndexPath) -> [UIDragItem] {
        guard let dataSource = tableView.dataSource as? CardDataSource else {return []}
        let itemProvider = NSItemProvider()
        let dragItem = UIDragItem(itemProvider: itemProvider)
        dragItem.localObject = DragObject(dataSource: dataSource, indexPath: indexPath, tableView: tableView)
        return [dragItem]
    }
}

struct DragObject {
    var dataSource: CardDataSource
    var indexPath: IndexPath
    var tableView: UITableView
}
