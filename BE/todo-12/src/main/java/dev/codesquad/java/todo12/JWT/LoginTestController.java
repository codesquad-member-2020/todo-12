package dev.codesquad.java.todo12.JWT;

import dev.codesquad.java.todo12.ApiResponseMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/login/test")
public class LoginTestController {

	@GetMapping
	public String verifyApplicationAccess(HttpServletRequest request) {

		return "hello world";
	}
}
