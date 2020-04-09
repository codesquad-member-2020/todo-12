//
//  Category.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

struct Category: Codable {
    var id: Int
    var name: String
    var cards: [Card]
}
