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
    var count: Int {
        return cards.count
    }
    
    func title(of index: Int) -> String {
        return cards[index].title ?? "제목 없음"
    }
    
    func content(of index: Int) -> String {
        return cards[index].content
    }
    
    func author(of index: Int) -> String {
        return "author by " + cards[index].author
    }
    
    func card(at index: Int) -> Card {
        return cards[index]
    }
    
    mutating func append(card: Card) {
        cards.append(card)
    }
    
    mutating func insert(_ newElement: Card, at index: Int) {
        cards.insert(newElement, at: index)
    }
    
    mutating func remove(at index: Int) {
        cards.remove(at: index)
    }
}
