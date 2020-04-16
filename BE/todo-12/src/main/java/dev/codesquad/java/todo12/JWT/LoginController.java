package dev.codesquad.java.todo12.JWT;


import dev.codesquad.java.todo12.ApiResponseMessage;
import dev.codesquad.java.todo12.User;
import dev.codesquad.java.todo12.Repository.UserRepository;
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
    private UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ApiResponseMessage createToken(@RequestBody HashMap<String, String> userInfo) throws Exception {
       try {
           return checkIdAndPassword(userInfo);
       } catch (NoSuchElementException e) {
           return new ApiResponseMessage("INCORRECT USER ID OR PASSWORD");
       }
    }


    public ApiResponseMessage checkIdAndPassword(@RequestBody HashMap<String, String> userInfo) {
        String inputId = userInfo.get("userId");
        String inputPassword = userInfo.get("password");
        User existUser = userRepository.findUserByUserID(inputId).get();
        String existPassword = existUser.getPassword();

        if (inputPassword.equals(existPassword)) {
            return new ApiResponseMessage("OK", Jwts.builder().claim("group", "todo12").setSubject(existUser.getUserId()).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, "secret").compact());
        }
        return new ApiResponseMessage("INCORRECT PASSWORD");
     }
    }
