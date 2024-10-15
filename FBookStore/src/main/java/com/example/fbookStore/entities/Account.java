package com.example.fbookStore.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String email;
    private String name;
    private String password;
    private String role;
    private String phoneNumber;
    private boolean firstPurchase = true;
    @OneToOne(mappedBy = "account")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    private List<Invoice> invoices;

    public Account(Long id, String email, String name, String password, String role, String phoneNumber) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
    }

    public Account() {
        id = null;
        name = null;
        password = null;
        email = null;
        role = null;
        phoneNumber = null;
    }

    public Account( String email, String password) {
        this.password = password;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' + ", email='" + email + '\'' +
                '}';
    }
}