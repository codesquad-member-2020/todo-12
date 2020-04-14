package dev.codesquad.java.todo12.JWT;


import java.util.Date;

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

    @PostMapping
    public ResponseEntity<ApiToken> login(@RequestBody User user) {
        return new ResponseEntity<>(
                new ApiToken(Jwts.builder().setSubject(user.getUserId()).claim("roles", "user")
                        .setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "123#&*zcvAWEE999").compact()),
                HttpStatus.OK);
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createToken(@RequestBody User user) throws Exception {
        String inputId = user.getUserId();
        String inputPassword = user.getPassword();

        ///userRepository 에 해당하는 유저 정보가 있는 조회
        User existUser = userRepository.findUserByUserID(inputId).get();
        String existPassword = existUser.getPassword();

        System.out.println("input id : " + user.getUserId() + ", input password : " + user.getPassword());

        if (userRepository.findUserByUserID(inputId) != null && existPassword.equals(inputPassword)) {
            System.out.println(">>>>>>>>>>>correct userID and PASSWORD");
            return ResponseEntity.ok(new ApiToken(Jwts.builder().setSubject(user.getUserId()).claim("roles", "user")
                    .setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "123#&*zcvAWEE999").compact()));
        }

        else {
            System.out.println(">>>>>>>>>>>>>>>>incorrect userID or PASSWORD");
            return (ResponseEntity<?>) ResponseEntity.badRequest();
        }

    }
}