package dev.codesquad.java.todo12.JWT;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.NoSuchElementException;


@RestController
public class LoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ApiResponseMessage createToken(@RequestBody HashMap<String, String> userInfo, HttpServletResponse response) throws Exception {
       try {
           return jwtUtil.checkIdAndPassword(userInfo);
       } catch (NoSuchElementException e) {
           response.setStatus(400);
           return new ApiResponseMessage(HttpStatus.BAD_REQUEST, false);
       }
    }
}
