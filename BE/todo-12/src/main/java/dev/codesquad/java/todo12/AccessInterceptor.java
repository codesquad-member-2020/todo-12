package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

public class AccessInterceptor extends HandlerInterceptorAdapter {
    private Logger logger = LoggerFactory.getLogger(AccessInterceptor.class);

    @Autowired
    private AccessService accessService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        final String token = request.getHeader(AUTHORIZATION);
        logger.info("token >> {}", token);
        if (!accessService.isValidToken(token)) {
            throw new InvalidTokenException("잘나옴?");
        }
        return true;
    }
}
