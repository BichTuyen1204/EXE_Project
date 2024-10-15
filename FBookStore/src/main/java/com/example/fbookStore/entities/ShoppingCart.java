package com.example.fbookStore.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter

@Entity
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id")

    private Account account;

    @OneToMany
    @JsonIgnore
    private List<CartItem> cartItemList;



    public ShoppingCart(List<CartItem> cartItemList, Account account) {
        this.cartItemList = cartItemList;
        this.account = account;
    }

    public ShoppingCart() {

    }
    public void setCartItemListNew(List<CartItem> cartItemList) {
        if (this.cartItemList == null) {
            this.cartItemList = new ArrayList<>();
        }
        this.cartItemList.clear(); // Clear the current collection
        this.cartItemList.addAll(cartItemList); // Add all from the new collection
    }
}

