//
//  todoDataSource.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardDataSource: NSObject, UITableViewDataSource {
    
    var model: Category? {
        didSet {
            handler()
        }
    }
    var handler: () -> () = {}
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return model?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "taskCell") as? CardCell else {return UITableViewCell()}
        guard let card = model?.cards[indexPath.row] else {return UITableViewCell()}
        cell.configure(with: card)
        
        return cell
    }
    
    func moveItem(at sourceIndex: Int, to destinationIndex: Int) {
        guard sourceIndex != destinationIndex else {return}
        guard let dragItem = model?.card(at: sourceIndex) else {return}
        
        model?.remove(at: sourceIndex)
        model?.insert(dragItem, at: destinationIndex)
    }
}
