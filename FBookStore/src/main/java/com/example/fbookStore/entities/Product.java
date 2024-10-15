package com.example.fbookStore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idBook;
    private String image;
    private String title;
    private String place_production;
    private float price;
    private String describle;
    private String weight;
    private int quantity;
    private int starNumber;
    private String status;

    @ManyToOne
    @JoinColumn (name = "category", nullable = true)
    private Category category;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<InvoiceItems> invoiceItems;
    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<CartItem> cartItems;

    public Product(Long idBook, String image, String title, String place_production, float price, String describle, String weight, int quantity, int starNumber) {
        this.idBook = idBook;
        this.image = image;
        this.title = title;
        this.place_production = place_production;
        this.price = price;
        this.describle = describle;
        this.weight = weight;
        this.starNumber = starNumber;
        this.quantity = quantity;

    }

    public Product(String image, String title, String place_production, float price, String describle, String weight, int quantity, Category idCategory) {
        this.image = image;
        this.title = title;
        this.place_production = place_production;
        this.price = price;
        this.describle = describle;
        this.weight = weight;
        this.quantity = quantity;
        this.category = idCategory;    }
}
