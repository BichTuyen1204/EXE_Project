//package com.example.fbookStore.entities;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.util.Date;
//import java.util.List;
//
//
//@Getter
//@Setter
//@Entity
//public class OrderInvoice {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long orderID;
//
//    private Date orderDate;
//    @ManyToOne (fetch = FetchType.LAZY)
//    @JoinColumn (name = "id")
//    private Account account;
//
//    private String shipAddress;
//    private String paymentMethod;
//    private float totalPrice;
//
//
//}
//
//
