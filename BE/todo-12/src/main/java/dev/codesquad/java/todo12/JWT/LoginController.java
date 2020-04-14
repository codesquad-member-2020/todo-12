package dev.codesquad.java.todo12.JWT;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import dev.codesquad.java.todo12.User;
import dev.codesquad.java.todo12.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public String createToken(@RequestBody Map<String, String> userInfo) throws Exception {
        String inputId = userInfo.get("userId");
        String inputPassword = userInfo.get("password");

        ///userRepository 에 해당하는 유저 정보가 있는 조회
        User existUser = userRepository.findUserByUserID(inputId).get();
        String existPassword = existUser.getPassword();

        System.out.println("input id : " + inputId + ", input password : " + inputPassword);

        if (userRepository.findUserByUserID(inputId) != null && existPassword.equals(inputPassword)) {
            System.out.println(">>>>>>>>>>>correct userID and PASSWORD");
            return Jwts.builder().claim("user", "user").setSubject(existUser.getUserId()).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, "secret").compact();
        }

        else {
            System.out.println(">>>>>>>>>>>>>>>>incorrect userID or PASSWORD");
            return "bad request";
        }

    }
}