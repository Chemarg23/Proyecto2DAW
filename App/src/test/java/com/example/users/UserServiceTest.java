package com.example.users;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.app.Application;
import com.app.dto.user.GetUserDTO;
import com.app.entity.User;
import com.app.repositories.UserRepository;
import com.app.services.users.UserServiceImpl;

@SpringBootTest(classes = Application.class)
class UserServiceTest {

    @Test
     void testGetUserById() {

        UserRepository userRepository = mock(UserRepository.class);

        User mockUser = new User(1L, "John Doe", "john@example.com", "password", "1234567890", "2022-03-16", null,0);
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        UserServiceImpl userService = new UserServiceImpl(userRepository, new ModelMapper(), new BCryptPasswordEncoder());

        GetUserDTO getUserDTO = userService.get(1L);
        assertEquals(1L, getUserDTO.getId());
        assertEquals("John Doe", getUserDTO.getName());
        assertEquals("john@example.com", getUserDTO.getEmail());

    }
}
