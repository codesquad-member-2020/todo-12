//
//  todoDataSource.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TaslDataSource: NSObject, UITableViewDataSource {
    
    var model: Category?
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return model?.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "taskCell") as? TaskCell else {return UITableViewCell()}
        
        cell.titleLabel.text = model?.title(of: indexPath.row)
        cell.contentLabel.text = model?.content(of: indexPath.row)
        cell.authorLabel.text = "author by " + ((model?.author(of: indexPath.row)) ?? "")
        
        return cell
    }
}
