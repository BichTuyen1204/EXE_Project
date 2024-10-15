//package com.example.fbookStore.service;
//
//import com.example.fbookStore.dto.InvoiceItemsDTO;
//import com.example.fbookStore.entities.Account;
//import com.example.fbookStore.entities.OrderInvoice;
//import com.example.fbookStore.entities.OrderProduct;
//import com.example.fbookStore.entities.Product;
//import com.example.fbookStore.repository.AccountRepository;
//import com.example.fbookStore.repository.OrderProductRepository;
//import com.example.fbookStore.repository.OrderRepository;
//import com.example.fbookStore.repository.ProductRepository;
//import org.antlr.v4.runtime.misc.Pair;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.sql.Date;
//import java.time.LocalDate;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class OrderService {
//    @Autowired
//    OrderRepository orderRepository;
//    @Autowired
//    OrderProductRepository orderProductRepository;
//    @Autowired
//    AccountRepository accountRepository;
//    @Autowired
//    ProductRepository productRepository;
//
//
//    public boolean addNewOrder(InvoiceItemsDTO order) {
//        OrderInvoice newOrder = new OrderInvoice();
//        Optional<Account> account = accountRepository.findById(order.getAccountID());
//
//        if (account.isPresent()){
//            LocalDate localDate = LocalDate.now();
//            Date currentDate = Date.valueOf(localDate);
//            newOrder.setOrderDate(currentDate);
//            newOrder.setShipAddress(order.getShipAddress());
//            newOrder.setPaymentMethod(order.getPaymentMethod());
//            newOrder.setTotalPrice(order.getTotalPrice());
//            newOrder.setAccount(account.get());
//            orderRepository.save(newOrder);
//
//
//            Long orderID = orderRepository.findLatestId();
//            Optional<OrderInvoice> orderInvoice = orderRepository.findById(orderID);
//            if (orderInvoice.isPresent()){
//                for (Pair<Long, Integer> productItem : order.getBookList()){
//                    Optional<Product> product = productRepository.findById(productItem.a);
//                    if (product.isPresent()){
//                        OrderProduct newOrderProduct = new OrderProduct();
//                        newOrderProduct.setOrder(orderInvoice.get());
//                        newOrderProduct.setProduct(product.get());
//                        newOrderProduct.setQuantity(productItem.b);
//                        orderProductRepository.save(newOrderProduct);
//                    }
//                    else {
//                        return false;
//                    }
//                }
//            }
//            else {
//                return false;
//            }
//
//            return true;
//        }
//        else {
//            return false;
//        }
//
//    }
//
//    public List<OrderInvoice> findAll() {
//        return orderRepository.findAll();
//    }
//}
