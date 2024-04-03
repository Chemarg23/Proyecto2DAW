
package com.example.users;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.app.Application;
import com.app.application.ports.services.UserService;
import com.app.dto.user.GetUserDTO;

@SpringBootTest(classes = Application.class)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void testGetUserById() throws Exception {
        GetUserDTO mockUserDTO = new GetUserDTO(24L, "John Doe", "john@example.com", "1234567890", 0, "2022-03-16",
                null,"");
        when(userService.get(24L)).thenReturn(mockUserDTO);

        mockMvc.perform(get("/api/users/24"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(mockUserDTO.getId()))
                .andExpect(jsonPath("$.name").value(mockUserDTO.getName()))
                .andExpect(jsonPath("$.email").value(mockUserDTO.getEmail()))
                .andExpect(jsonPath("$.phone").value(mockUserDTO.getPhone()));
    }
}
