//
//  TaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class TaskViewController: UIViewController {

    @IBOutlet weak var totalTaskLabel: UILabel!
    @IBOutlet weak var taskTabelView: UITableView!
    
    private let dataSource = todoDataSource()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
        taskTabelView.dataSource = dataSource
    }
    
    private func setLabelRadius() {
        let superViewHeight = totalTaskLabel.superview?.layer.frame.height ?? 0
        totalTaskLabel.clipsToBounds = true
        totalTaskLabel.layer.cornerRadius = superViewHeight * 0.24
    }
}
