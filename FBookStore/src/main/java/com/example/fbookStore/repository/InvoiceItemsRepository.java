package com.example.fbookStore.repository;

import com.example.fbookStore.dto.InvoiceItemsDTO;
import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Invoice;
import com.example.fbookStore.entities.InvoiceItems;
import com.example.fbookStore.entities.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InvoiceItemsRepository extends JpaRepository<InvoiceItems, Long> {
    @Modifying
    @Transactional
    @Query("delete InvoiceItems v " +
            "where v.invoice.invoiceID = :invoiceID")
    void deleteInvoiceItemsByInvoiceID(
            @Param(value="invoiceID") Long invoiceID
    );

    @Modifying
    @Transactional
    @Query("select invoiceItems from InvoiceItems invoiceItems")
    List<InvoiceItems> findInoiceItems();



    @Modifying
    @Transactional
    @Query("update InvoiceItems v " +
            "set v.quantity = :quantity " +
            "where v.product.idBook = :idBook and v.invoice.invoiceID = :invoiceID")
    void updateInvoiceItem(
            @Param(value = "invoiceID") Long invoiceID,
            @Param(value="idBook") Long idBook,
            @Param(value="quantity") int quantity
    );

//    @Modifying
//    @Transactional
//    @Query(value ="select v " +
//            "from invoice_items " +
//            "where v.invoiceID = :invoiceID",
//            nativeQuery = true
//    )
//    List<InvoiceItems> findByInvoiceID(
//        @Param(value = "invoiceID") Long invoiceID
//    );

    @Modifying
    @Transactional
    @Query("SELECT item FROM InvoiceItems item WHERE item.invoice.invoiceID = :invoiceId")
    List<InvoiceItems> findInvoiceItemsByInvoice(@Param("invoiceId") Long invoiceId);
}
