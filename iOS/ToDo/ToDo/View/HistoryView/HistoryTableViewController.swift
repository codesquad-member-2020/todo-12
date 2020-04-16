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
        guard let history = historys?[indexPath.row] else {return UITableViewCell()}
        DispatchQueue.main.async {
            switch history.action {
            case "moved":
                cell.contentLabel.text = self.moved(history: history)
                break
            case "added":
                cell.contentLabel.text = self.added(history: history)
                break
            case "deleted":
                cell.contentLabel.text = self.deleted(history: history)
            default:
                break
            }
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return historys?.count ?? 0
    }
    
    func moved(history: History) -> String {
        let moved = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") from \(history.fromCategory ?? "") to \(history.toCategory)"
        return moved
    }
    
    func added(history: History) -> String {
        let added = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") to \(history.toCategory)"
        return added
    }
    
    func deleted(history: History) -> String {
        let deleted = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") fromo \(history.fromCategory ?? "")"
        return deleted
    }
}
