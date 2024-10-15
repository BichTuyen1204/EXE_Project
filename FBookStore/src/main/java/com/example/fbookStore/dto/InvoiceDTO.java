package com.example.fbookStore.dto;

import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.InvoiceItems;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Data
@Getter
@Setter
public class InvoiceDTO {

    private Long invoiceID;
    private Date invoiceDate;
    private Account account;
    private String invoiceName;
    private String invoiceEmail;
    private String invoicePhone;
    private String shipAddress;
    private String paymentMethod;
    private List<InvoiceItems> invoiceItems;

    public InvoiceDTO () {

    }

}
