package dev.codesquad.java.todo12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessService {
    @Autowired
    private UserRepository userRepository;

}
