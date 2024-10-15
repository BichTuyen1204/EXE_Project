package com.example.fbookStore.dto;

import lombok.Data;

@Data
public class AccountDTO {
    private Long id;
    private String email;
    private String name;
    private String password;
    private String role;
    private String address;
    private String phoneNumber;


    public AccountDTO(Long id, String email, String name, String password, String role, String address, String phoneNumber) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}
