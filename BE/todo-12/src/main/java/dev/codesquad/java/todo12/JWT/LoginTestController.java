package dev.codesquad.java.todo12.JWT;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login/test")
public class LoginTestController {

	@GetMapping
	public String verifyApplicationAccess() {
		return "올바른 jwt 를 입력하셨습니다";
	}
}
