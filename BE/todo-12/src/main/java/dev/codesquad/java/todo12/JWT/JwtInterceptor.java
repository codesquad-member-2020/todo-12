package dev.codesquad.java.todo12.JWT;

import dev.codesquad.java.todo12.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null) {
            response.setStatus(401);
            return false;
        }
         String jwt = authorizationHeader;
         String username = jwtUtil.extractUsername(jwt);
            User user = userRepository.findUserByUserID(username).get();
        return jwtUtil.validateToken(jwt, user);
    }

}
