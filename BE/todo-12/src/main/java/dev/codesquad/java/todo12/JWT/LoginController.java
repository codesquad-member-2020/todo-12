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
        try {
            User existUser = userRepository.findUserByUserID(inputId).get();
            String existPassword = existUser.getPassword();
            return new ResponseEntity(Jwts.builder().claim("group", "todo12").setSubject(existUser.getUserId()).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, "secret").compact(), HttpStatus.OK);
        }   catch (NoSuchElementException e) {
            System.out.println(">>>>>>>>>>>>>>>>incorrect userID or PASSWORD");
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    }