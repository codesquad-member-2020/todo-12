//
//  HistoryTableViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class HistoryTableViewController: UITableViewController {
    
    private var historyManager: HistoryManager? {
        didSet {
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
    
    private let operationQueue = OperationQueue()
    
    override func viewDidLoad() {
        NetworkConnection.loadHistroyModel {
            self.historyManager = HistoryManager(historys: $0.sorted {$0.id > $1.id})
        }
        
        operationQueue.addOperation {
            while true {
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
                sleep(1)
            }
        }
        
        super.viewDidLoad()
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "historyCell") as? HistoryCell else {return UITableViewCell()}
        guard let history = historyManager?.history(at: indexPath.row) else {return UITableViewCell()}
        DispatchQueue.main.async {
            cell.contentLabel.attributedText = self.historyManager?.action(history: history)
            cell.timeLabel.text = Calendar.current.leftTime(date: history.modifiedTime)
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return historyManager?.count ?? 0
    }
}
