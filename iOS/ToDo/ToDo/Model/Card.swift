//
//  Card.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

struct Card: Codable {
    var id: Int
    var categoryKey: Int
    var title: String?
    var content: String
    var author: String?
    var modifiedTime: Date?
}
