//
//  HistoryTableViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class HistoryTableViewController: UITableViewController {
    
    var historys: [History]? {
        didSet {
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
    
    override func viewDidLoad() {
        NetworkConnection.loadHistroyModel {
            self.historys = $0.sorted {$0.id > $1.id}
        }
        
        super.viewDidLoad()
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "historyCell") as? HistoryCell else {return UITableViewCell()}
        guard let id = historys?[indexPath.row].id else {return UITableViewCell()}
        cell.contentLabel.text = String(id)
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return historys?.count ?? 0
    }
}
