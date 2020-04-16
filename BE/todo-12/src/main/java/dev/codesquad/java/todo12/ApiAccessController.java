package dev.codesquad.java.todo12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class ApiAccessController {

    @Autowired
    private AccessService accessService;

    @PostMapping("/login")
    public String createToken(@RequestBody HashMap<String, String> userInfo) {
        return accessService.buildToken(userInfo);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
