package com.example.fbookStore.dto;

import com.example.fbookStore.entities.Product;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Data
@Setter
@Getter
public class InvoiceItemsDTO {
    private Long itemID;
    private int quantity;
    private int invoiceId;
    private Product product;

    public InvoiceItemsDTO(Long itemID, int quantity, int invoiceId, Product product) {
        this.itemID = itemID;
        this.quantity = quantity;
        this.invoiceId = invoiceId;
        this.product = product;
    }
}
