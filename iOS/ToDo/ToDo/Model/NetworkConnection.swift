//
//  NetworkConnection.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class NetworkConnection {
    class func request(resource: String, errorHandler: @escaping () -> (), handlder: @escaping (Data) -> Void){
        
        let encodedString = resource.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        guard let url = URL(string: encodedString) else {return}
        
        let dataTask = URLSession.shared.dataTask(with: url) { (data: Data?, response: URLResponse?, error: Error?) in
            guard error == nil else {
                errorHandler()
                return
            }
            
            guard let data = data, let response = response as? HTTPURLResponse, response.statusCode == 200 else {return}
            
            handlder(data)
        }
        
        dataTask.resume()
    }
}
