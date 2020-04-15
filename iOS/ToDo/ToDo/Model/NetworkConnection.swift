//
//  NetworkConnection.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class NetworkConnection {
    
    static let endPoint: String = "http://15.165.163.174/api/"
    
    enum HTTPHeaderField {
        static let TYPE = "Content-Type"
    }
    
    enum HTTPHeaderValue {
        static let JSON = "application/json"
    }
    
    enum HTTPMethod: String {
        case GET
        case POST
        case PUT
        case DELETE
    }
    
    class func request(httpMethod: HTTPMethod, quertString: String, httpBody: Data?, errorHandler: @escaping () -> (), handlder: @escaping (Data) -> Void){
        let encodedString = (endPoint + quertString).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        guard let url = URL(string: encodedString) else {return}
        var request = URLRequest(url: url)
        
        request.httpMethod = httpMethod.rawValue
        request.addValue(HTTPHeaderValue.JSON, forHTTPHeaderField: HTTPHeaderField.TYPE)
        if let body = httpBody {
            request.httpBody = body
        }
        
        let dataTask = URLSession.shared.dataTask(with: request) { (data: Data?, response: URLResponse?, error: Error?) in
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
