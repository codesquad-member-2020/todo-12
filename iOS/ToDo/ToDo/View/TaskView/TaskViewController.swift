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
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var addTaskButton: UIButton!
    @IBAction func addTaskButtonPushed(_ sender: UIButton) {
        dataSource.model?.append(card: Card(id: 0, title: "추가된 제목", content: "추가된 내용", author: "author by iOS"))
        let indexPath = IndexPath(row: taskTabelView.numberOfRows(inSection: 0), section: 0)
        taskTabelView.insertRows(at: [indexPath], with: .automatic)
    }
    
    let dataSource = TaskDataSource()
    private let delegate = TaskTableViewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
        taskTabelView.dataSource = dataSource
        taskTabelView.delegate = delegate
        dataSource.handler = {
            self.totalTaskLabel.text = String(self.dataSource.model?.count ?? 0)
        }
        delegate.handler = {
            guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditTaskViewController else {return}
            editView.model = self.dataSource.model?.cards[$0]
            self.present(editView, animated: true)
        }
    }
    
    private func setLabelRadius() {
        let superViewHeight = totalTaskLabel.superview?.layer.frame.height ?? 0
        totalTaskLabel.clipsToBounds = true
        totalTaskLabel.layer.cornerRadius = superViewHeight * 0.24
    }
}
