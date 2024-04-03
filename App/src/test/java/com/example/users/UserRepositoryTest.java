package com.example.users;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashSet;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.app.Application;
import com.app.application.ports.repositories.UserRepository;
import com.app.domain.entity.User;

@SpringBootTest(classes = Application.class)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Test
    void testSaveUser() {
        User user = new User(null, "John Doe", "john@example.com", passwordEncoder.encode("password"), "1234567890", "2022-03-16", null,0,new HashSet(),"");
        User savedUser = userRepository.save(user);
        assertNotNull(savedUser.getId());
        assertEquals(user.getName(), savedUser.getName());
        assertEquals(user.getEmail(), savedUser.getEmail());

    }
}
