package com.example.fbookStore.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCartItem;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "id_book")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "shopping_cart_id")

    private ShoppingCart shoppingCart;

    public CartItem(int quantity, Product product, Long idCartItem) {
        this.quantity = quantity;
        this.product = product;
        this.idCartItem = idCartItem;
    }

    public CartItem() {
    }
}
