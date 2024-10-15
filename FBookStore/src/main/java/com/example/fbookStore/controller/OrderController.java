//package com.example.fbookStore.controller;
//
//import com.example.fbookStore.dto.InvoiceItemsDTO;
//import com.example.fbookStore.entities.OrderInvoice;
//import com.example.fbookStore.service.OrderService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/order")
//@ComponentScan
//public class OrderController {
//    @Autowired
//    private OrderService orderService;
//
//    @PostMapping("/addNew")
//    public ResponseEntity<?> addNewOrder(@RequestBody InvoiceItemsDTO orderDTO) {
//        if (orderService.addNewOrder(orderDTO)) {
//            return ResponseEntity.ok().build();
//        }
//        return ResponseEntity.badRequest().build();
//    }
//
//    @CrossOrigin(origins = "http://localhost:3000")
//    @GetMapping({"/getAllOrders"})
//    public List<OrderInvoice> getAllOrders() {
//        return orderService.findAll();
//    }
//}
