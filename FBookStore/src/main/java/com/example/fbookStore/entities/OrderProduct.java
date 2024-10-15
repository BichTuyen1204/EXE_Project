//package com.example.fbookStore.entities;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//@Entity
//public class OrderProduct {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long itemID;
//
//    @ManyToOne (fetch = FetchType.LAZY)
//    @JoinColumn(name = "orderID")
//    private OrderInvoice order;
//
//    @ManyToOne (fetch = FetchType.LAZY)
//    @JoinColumn(name = "idBook")
//    private Product product;
//
//    private int quantity;
//
//
//}
