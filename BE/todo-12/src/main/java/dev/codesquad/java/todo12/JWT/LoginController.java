package dev.codesquad.java.todo12.JWT;


import dev.codesquad.java.todo12.ApiResponseMessage;
import dev.codesquad.java.todo12.User;
import dev.codesquad.java.todo12.Repository.UserRepository;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.NoSuchElementException;


@RestController
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ApiResponseMessage createToken(@RequestBody HashMap<String, String> userInfo) throws Exception {
       try {
           return jwtUtil.checkIdAndPassword(userInfo);
       } catch (NoSuchElementException e) {
           return new ApiResponseMessage(HttpStatus.BAD_REQUEST, false);
       }
    }
}
