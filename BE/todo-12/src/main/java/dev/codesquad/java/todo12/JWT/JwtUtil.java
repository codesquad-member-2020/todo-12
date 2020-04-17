package dev.codesquad.java.todo12.JWT;
import dev.codesquad.java.todo12.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtil {

    @Autowired
    private UserRepository userRepository;

    private String SECRET_KEY = "secret";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, user.getUserId());
    }

    public static String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, "secret").compact();
    }

    public Boolean validateToken(String token, User user) {
        final String username = extractUsername(token);
        return (username.equals(user.getUserId()) && !isTokenExpired(token));
    }

    public ApiResponseMessage checkIdAndPassword(@RequestBody HashMap<String, String> userInfo) {
        String inputId = userInfo.get("userId");
        String inputPassword = userInfo.get("password");
        User existUser = userRepository.findUserByUserID(inputId).get();
        String existPassword = existUser.getPassword();

        if (inputPassword.equals(existPassword)) {
            String newToken = Jwts.builder().claim("group", "todo12").setSubject(existUser.getUserId()).setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                    .signWith(SignatureAlgorithm.HS256, "secret").compact();
            System.out.println("token>>>>>>>>>>> : "  + newToken);
            return new ApiResponseMessage(HttpStatus.OK, true, newToken);
        }
        return new ApiResponseMessage(HttpStatus.BAD_REQUEST, false);
    }
}
