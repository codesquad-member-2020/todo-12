package dev.codesquad.java.todo12;

import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.jsonwebtoken.Jwts;

import java.util.Date;
import java.util.HashMap;

@Service
public class AccessService {
    private Logger logger = LoggerFactory.getLogger(AccessService.class);

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public String buildToken(HashMap<String, String> userInfo) {
        User user = validateUser(userInfo);
        return Jwts.builder()
                .claim("group", "todo12")
                .setSubject(user.getUserId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, "secret")
                .compact();
    }

    private User validateUser(HashMap<String, String> userInfo) {
        User user = getUser(userInfo.get("userId"));
        if (!user.isPasswordEquals(userInfo.get("password"))) {
            throw new DataNotFoundException("INCORRECT PASSWORD");
        }
        return user;
    }

    private User getUser(String userId) {
        return userRepository.findByUserId(userId).orElseThrow(() -> new DataNotFoundException("존재하지 않는 userID 입니다."));
    }
}
