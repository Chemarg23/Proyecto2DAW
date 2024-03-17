package com.app.dto.auth;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticatedUser {
     private Long id;

    private String name;

    private String email;

    private String phone;

    private String token;
    
    private String createdAt = LocalDate.now().toString();

    private int rol;
    
    private LocalDate dischargeDate = null;
}
