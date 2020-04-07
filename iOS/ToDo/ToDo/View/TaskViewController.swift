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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
    }
    
    private func setLabelRadius() {
        totalTaskLabel.clipsToBounds = true
        totalTaskLabel.layer.cornerRadius = totalTaskLabel.layer.frame.height * 0.5
    }
}
