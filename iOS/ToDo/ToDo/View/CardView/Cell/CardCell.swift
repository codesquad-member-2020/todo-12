//
//  taskCell.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/07.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardCell: UITableViewCell {
    
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var contentLabel: UILabel!
    @IBOutlet weak var authorLabel: UILabel!
    
    func configure(with card: Card) {
        titleLabel.text = card.title ?? "제목 없음"
        contentLabel.text = card.content
        authorLabel.text = "author by " + card.author
    }
}

