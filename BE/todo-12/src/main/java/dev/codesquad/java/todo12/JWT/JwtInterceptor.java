package dev.codesquad.java.todo12.JWT;

import dev.codesquad.java.todo12.Repository.UserRepository;
import dev.codesquad.java.todo12.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            return false;
        }
        String username = null;
        String jwt = null;

            jwt = authorizationHeader;
            username = jwtUtil.extractUsername(jwt);
            User user = userRepository.findUserByUserID(username).get();
//            if (jwtUtil.validateToken(jwt, user)) {
//                final Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(authorizationHeader)
//                        .getBody();
//                request.setAttribute("claims", claims);
//            }
//        }

        return jwtUtil.validateToken(jwt, user);
    }

}
