package com.example.users;

import static org.junit.jupiter.api.Assertions.*;

import java.util.HashSet;

import org.junit.jupiter.api.Test;

import com.app.domain.entity.User;

class UserTest {

    @Test
    void testConstructorAndGetters() {
        User user = new User(1L, "John Doe", "john@example.com", "password", "1234567890", "2022-03-16", null,0,new HashSet(),"");
        assertNotNull(user);
        assertEquals(1L, user.getId());
        assertEquals("John Doe", user.getName());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("1234567890", user.getPhone());
        assertEquals("2022-03-16", user.getCreatedAt());
        assertEquals(null, user.getDischargeDate());
    }
}

