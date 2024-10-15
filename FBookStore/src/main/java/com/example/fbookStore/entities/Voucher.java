package com.example.fbookStore.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@Entity
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private BigDecimal discountValue;
    private String status;
    private LocalDate expiryDate;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    public Voucher() {}

    public Voucher(Account account, String status, BigDecimal discountValue, String code) {
        this.account = account;
        this.status = status;
        this.discountValue = discountValue;
        this.code = code;
    }
}
