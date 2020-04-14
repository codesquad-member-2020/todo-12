//
//  CategoryManager.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/15.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class CategoryManager {
    private(set) var id: Int
    private(set) var name: String
    private(set) var cardManager: CardManager
    var count: Int {
        return cardManager.count
    }
    
    init(id: Int, name: String, cards: [Card]) {
        self.id = id
        self.name = name
        self.cardManager = CardManager(cards: cards)
    }
}
