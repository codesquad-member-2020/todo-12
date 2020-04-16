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

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    private String catchUnauthorizedException(UnauthorizedException e) {
        return e.getMessage();
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    private String catchInvalidTokenException(InvalidTokenException e) {
        return e.getMessage();
    }
}
