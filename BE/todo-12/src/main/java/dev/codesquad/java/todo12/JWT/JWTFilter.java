package dev.codesquad.java.todo12.JWT;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dev.codesquad.java.todo12.User;
import dev.codesquad.java.todo12.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        System.out.println(" >>>> token : " + authorizationHeader);

        String username = null;
        String jwt = null;

        if (authorizationHeader != null) {
            jwt = authorizationHeader;
            username = jwtUtil.extractUsername(jwt);
            System.out.println("jwt : " + jwt + "username : " + username);
            User user = userRepository.findUserByUserID(username).get();
            if (jwtUtil.validateToken(jwt, user)) {
                final Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(authorizationHeader)
                        .getBody();
                request.setAttribute("claims", claims);
                System.out.println("claims : " + claims);
            }
            System.out.println("response : " + response);
            chain.doFilter(request, response);
        }
    }
}
