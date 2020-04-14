package dev.codesquad.java.todo12.JWT;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

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

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity createToken(@RequestBody HashMap<String, String> userInfo) throws Exception {
        String inputId = userInfo.get("userId");
        String inputPassword = userInfo.get("password");

        System.out.println("input id : " + inputId);
        System.out.println("password : " + inputPassword);
        ///userRepository 에 해당하는 유저 정보가 있는 조회

        try {
            User existUser = userRepository.findUserByUserID(inputId).get();
            String existPassword = existUser.getPassword();
//            userRepository.findUserByUserID(inputId);
            return new ResponseEntity(Jwts.builder().claim("birthday", "12").setSubject(existUser.getUserId()).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, "secret").compact(), HttpStatus.OK);
        }   catch (NoSuchElementException e) {
            System.out.println(">>>>>>>>>>>>>>>>incorrect userID or PASSWORD");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    }
