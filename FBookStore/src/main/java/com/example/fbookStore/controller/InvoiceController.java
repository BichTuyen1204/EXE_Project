package com.example.fbookStore.controller;

import com.example.fbookStore.dto.InvoiceDTO;
import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Invoice;
import com.example.fbookStore.entities.InvoiceItems;
import com.example.fbookStore.entities.ShoppingCart;
import com.example.fbookStore.repository.AccountRepository;
import com.example.fbookStore.repository.InvoiceRepository;
import com.example.fbookStore.service.AccountService;
import com.example.fbookStore.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/order")
@ComponentScan
public class InvoiceController {
    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    InvoiceService invoiceService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;

    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<?> addNewInvoice(@RequestBody Invoice invoice) {
        try {
            Account account = invoice.getAccount();
            if (account.isFirstPurchase()) {
                account.setFirstPurchase(false);
                accountRepository.save(account);
            }
            return ResponseEntity.status(HttpStatus.OK).body(invoiceService.addNewInvoice(invoice));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving invoice: " + e.getMessage());
        }
    }

//    @GetMapping("/check")
//    public ResponseEntity<Boolean> checkIfAccountHasInvoice(@AuthenticationPrincipal Account account) {
//        boolean hasInvoice = invoiceService.hasInvoice(account.getId());
//        return ResponseEntity.ok(hasInvoice);
//    }

    @DeleteMapping({"/delete/{invoiceID}"})
    public ResponseEntity<?> deleteInvoice(@PathVariable("invoiceID") Long id) {

        try {
            if (Objects.isNull(id)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing id");
            }
            String message = invoiceService.deleteInvoice(id);
            return ResponseEntity.status(HttpStatus.OK).body(message);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }

    }

    @PutMapping({"/update"})
    public ResponseEntity<?> updateInvoice(@RequestBody Invoice invoice) {
        String message = invoiceService.updateInvoice(invoice);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @GetMapping({"/getAllInvoice"})
    public List<Invoice> getAllInvoice() {
        return invoiceService.getAllInvoice();
    }

    @GetMapping({"/getInvoiceById/{invoiceId}"})
    public Invoice getInvoiceById(@PathVariable("invoiceId") Long invoiceId) {
        try {
            return invoiceService.getInvoiceById(invoiceId);
        } catch (Exception e) {
            return (Invoice) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping({"/getInvoiceByEmail/{email}"})
    public ResponseEntity<?> getInvoiceByEmail(@PathVariable("email") String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(invoiceService.getInvoiceByEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
