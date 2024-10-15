package com.example.fbookStore.service;

import com.example.fbookStore.dto.InvoiceDTO;
import com.example.fbookStore.dto.InvoiceItemsDTO;
import com.example.fbookStore.entities.*;
import com.example.fbookStore.repository.*;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    InvoiceItemsRepository invoiceItemsRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ShoppingCartService shoppingCartService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    public Invoice addNewInvoice(Invoice invoice) {
        LocalDate localDate = LocalDate.now();
        Date currentDate = Date.valueOf(localDate);
        invoice.setInvoiceDate(currentDate);
        for (InvoiceItems invoiceItem : invoice.getInvoiceItems()) {
            //update quantity of product
            Product product = productRepository.findById(invoiceItem.getProduct().getIdBook())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            product.setQuantity(product.getQuantity() - invoiceItem.getQuantity());
            productRepository.save(product);

            // set invoice id for each invoiceItem
            invoiceItem.setInvoice(invoice);
            invoiceItemsRepository.save(invoiceItem);
        }
        // save invoice
        invoiceRepository.save(invoice);
        // delete book in cart
        cartItemRepository.deleteCartItemByIdCart(shoppingCartService.idShoppingCart(invoice.getAccount().getEmail()));
        return invoice;
    }

    public String deleteInvoice(Long invoiceID) {
        Optional<Invoice> invoice = invoiceRepository.findById(invoiceID);
        if (invoice.isEmpty()) {
            return "Problem when deleting invoice with id: " + invoiceID;
        } else {
            invoiceItemsRepository.deleteInvoiceItemsByInvoiceID(invoiceID);
            invoiceRepository.deleteById(invoiceID);
            return "Deleted successfully invoice with id: " + invoiceID;
        }
    }

    public String updateInvoice(Invoice invoice) {
        for (InvoiceItems item : invoice.getInvoiceItems()) {
            invoiceItemsRepository.updateInvoiceItem(
                    invoice.getInvoiceID(),
                    item.getProduct().getIdBook(),
                    item.getQuantity()
            );
        }
        invoiceRepository.updateInvoice(
                invoice.getInvoiceID(),
                invoice.getPaymentMethod(),
                invoice.getShipAddress(),
                invoice.getTotalPrice()
        );
        return "Update successful";
    }

    public List<Invoice> getAllInvoice() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long invoiceId) {
        return invoiceRepository.findById(invoiceId).get();
    }

    public List<Invoice> getInvoiceByEmail(String email) {
        return invoiceRepository.findInvoiceByEmail(email);
    }

    public List<InvoiceItems> getAllItem() {
        return invoiceItemsRepository.findAll();
    }
}
