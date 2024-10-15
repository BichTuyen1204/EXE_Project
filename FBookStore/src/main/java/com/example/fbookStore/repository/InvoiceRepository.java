package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Invoice;
import com.example.fbookStore.entities.ShoppingCart;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    long countByAccountId(Long id);
    @Modifying
    @Transactional
    @Query("update Invoice v " +
            "set v.paymentMethod = :paymentMethod, v.shipAddress = :shipAddress, v.totalPrice = :totalPrice " +
            "where v.invoiceID = :invoiceID")
    void updateInvoice(
            @Param(value="invoiceID") Long invoiceID,
            @Param(value="paymentMethod") String paymentMethod,
            @Param(value="shipAddress") String shipAddress,
            @Param(value="totalPrice") float totalPrice
    );

    @Modifying
    @Transactional
    @Query("select invoices from Invoice invoices")
    List<Invoice> findInVoice();

    @Query("SELECT invoice FROM Invoice invoice WHERE invoice.account.email =:email")
    List<Invoice> findInvoiceByEmail(String email);
}
