//
//  DateExtension.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/16.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

extension DateFormatter {
    static let dateConverter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss.SSS"
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()
}

