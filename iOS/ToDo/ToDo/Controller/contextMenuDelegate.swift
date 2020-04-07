//
//  contextMenuDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class contextMenuDelegate: NSObject, UIContextMenuInteractionDelegate {
    func contextMenuInteraction(_ interaction: UIContextMenuInteraction, configurationForMenuAtLocation location: CGPoint) -> UIContextMenuConfiguration? {
        return UIContextMenuConfiguration(identifier: nil, previewProvider: nil) { action in
            return self.contextMenu()
        }
    }
    
    func contextMenu() -> UIMenu {
        let moveToDone = UIAction(title: "move to done") { action in }
        let edit = UIAction(title: "edit...") { action in }
        let delete = UIAction(title: "delete", attributes: .destructive) { action in}
        let menu = UIMenu(title: "", children: [moveToDone, edit, delete])
        
        return menu
    }
}
