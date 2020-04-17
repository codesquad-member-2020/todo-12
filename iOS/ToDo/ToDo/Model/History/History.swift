//
//  History.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/16.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

struct History: Codable {
    var id: Int
    var userId: String
    var action: String
    var cardTitle: String?
    var cardContent: String
    var fromCategory: String?
    var toCategory: String
    var modifiedTime: Date
}
