//
//  todoDataSource.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TodoDataSource: NSObject, UITableViewDataSource {
    
    let contextDelegate = ContextMenuDelegate()
    var model = [1,2,3,4,5,6,7,8,9,10]
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return model.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "taskCell") as? TaskCell else {return UITableViewCell()}
        
        cell.titleLabel.text = String(model[indexPath.row])
        let interaction = UIContextMenuInteraction(delegate: contextDelegate)
        cell.addInteraction(interaction)
        return cell
    }
}
