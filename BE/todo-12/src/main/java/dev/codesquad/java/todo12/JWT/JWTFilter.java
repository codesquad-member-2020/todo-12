//package dev.codesquad.java.todo12.JWT;
//
//import dev.codesquad.java.todo12.User;
//import dev.codesquad.java.todo12.Repository.UserRepository;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Component
//public class JWTFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtil jwtUtil;
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
//        final String authorizationHeader = request.getHeader("Authorization");
//        String username = null;
//        String jwt = null;
//
//        if (authorizationHeader != null) {
//            jwt = authorizationHeader;
//            username = jwtUtil.extractUsername(jwt);
//            User user = userRepository.findUserByUserID(username).get();
//            if (jwtUtil.validateToken(jwt, user)) {
//                final Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(authorizationHeader)
//                        .getBody();
//                request.setAttribute("claims", claims);
//            }
//        }
//            chain.doFilter(request, response);
//    }
//
//
//}

