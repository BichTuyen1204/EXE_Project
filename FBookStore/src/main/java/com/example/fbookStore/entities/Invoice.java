package com.example.fbookStore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long invoiceID;

    private Date invoiceDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "account_id",nullable = false)
    private Account account;
    private String invoiceName;
    private String invoiceEmail;
    private String invoicePhone;
    private String shipAddress;
    private String paymentMethod;
    @OneToMany( mappedBy = "invoice",cascade = CascadeType.MERGE)
    private List<InvoiceItems> invoiceItems;
    private float totalPrice;
}
