//
//  TaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TaskViewController: UIViewController, UITableViewDelegate {
    
    @IBOutlet weak var totalTaskLabel: UILabel!
    @IBOutlet weak var taskTabelView: UITableView!
    
    @IBAction func addTaskButtonPushed(_ sender: UIButton) {
        dataSource.model.append(dataSource.model[dataSource.model.count - 1] + 1)
        taskTabelView.reloadData()
    }
    
    private let dataSource = TodoDataSource()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
        taskTabelView.dataSource = dataSource
        taskTabelView.delegate = self
        totalTaskLabel.text = String(taskTabelView.numberOfRows(inSection: 0))
    }
    
    private func setLabelRadius() {
        let superViewHeight = totalTaskLabel.superview?.layer.frame.height ?? 0
        totalTaskLabel.clipsToBounds = true
        totalTaskLabel.layer.cornerRadius = superViewHeight * 0.24
    }
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let deleteAction = UIContextualAction(style: .destructive, title:  "삭제", handler: { action, view, completionHandler in
            self.dataSource.model.remove(at: indexPath.row)
            tableView.deleteRows(at: [indexPath], with: .automatic)
            completionHandler(true)
        })
        
        return UISwipeActionsConfiguration(actions: [deleteAction])
    }
}
