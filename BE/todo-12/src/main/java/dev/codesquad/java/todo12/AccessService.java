package dev.codesquad.java.todo12;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.jsonwebtoken.Jwts;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

@Service
public class AccessService {
    private Logger logger = LoggerFactory.getLogger(AccessService.class);
    private static final String SECRET_KEY = "secret";

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public String buildToken(HashMap<String, String> userInfo) {
        User user = validatedUser(userInfo);
        return Jwts.builder()
                .claim(TOKEN_IDENTIFIER_NAME, TOKEN_IDENTIFIER_VALUE)
                .setSubject(user.getUserId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    @Transactional
    public boolean isValidToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            throw new InvalidTokenException(e.getMessage());
        }
    }

    @Transactional
    public String getUserId() {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String token = request.getHeader(AUTHORIZATION);
        Jws<Claims> claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        return claims.getBody().getSubject();
    }

    private User validatedUser(HashMap<String, String> userInfo) {
        User user = getUser(userInfo.get("userId"));
        if (!user.isPasswordEquals(userInfo.get("password"))) {
            throw new UnauthorizedException(WRONG_PASSWORD);
        }
        return user;
    }

    private User getUser(String userId) {
        return userRepository.findByUserId(userId).orElseThrow(() -> new DataNotFoundException(NO_USER));
    }
}
