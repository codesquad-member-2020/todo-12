//
//  todoDataSource.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class todoDataSource: NSObject, UITableViewDataSource {
    
    let contextDelegate = contextMenuDelegate()
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        20
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "taskCell") as? taskCell else {return UITableViewCell()}
        
        let interaction = UIContextMenuInteraction(delegate: contextDelegate)
        cell.addInteraction(interaction)
        return cell
    }
}
