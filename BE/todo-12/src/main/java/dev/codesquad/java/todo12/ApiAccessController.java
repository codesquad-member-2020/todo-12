package dev.codesquad.java.todo12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class ApiAccessController {

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity createToken(@RequestBody HashMap<String, String> userInfo) {
        String token = tokenService.buildToken(userInfo);
        return new ResponseEntity(token, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity jwtTest() {
        String str = "정상 접속 확인";
        return new ResponseEntity(str, HttpStatus.OK);
    }
}
