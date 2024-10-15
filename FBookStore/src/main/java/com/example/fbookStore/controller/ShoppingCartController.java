package com.example.fbookStore.controller;

import com.example.fbookStore.entities.CartItem;
import com.example.fbookStore.entities.ShoppingCart;
import com.example.fbookStore.repository.CartItemRepository;
import com.example.fbookStore.service.AccountService;
import com.example.fbookStore.service.CartItemService;
import com.example.fbookStore.service.ProductService;
import com.example.fbookStore.service.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/cart")
@CrossOrigin(origins = "http://localhost:3000")
@ComponentScan
public class ShoppingCartController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    ProductService productService;

    @Autowired
    ShoppingCartService shoppingCartService;

    @GetMapping({"/getAllCartAdmin"})
    public List<CartItem> getAllCartAdmin() {
        return cartItemService.getAllCartAdmin();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping({"/getCart/{email}"})
    public ShoppingCart getCart(@PathVariable String email) {
        try {
            ShoppingCart cart = shoppingCartService.getShoppingCart(email);
            return cart;
            // return ResponseEntity.ok(cart).getBody();
        } catch (Exception e) {
            return (ShoppingCart) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping({"/getBookInCart/{email}"})
    public List<CartItem> getBookInShoppingCart(@PathVariable String email) {
        try {
            List<CartItem> cart = shoppingCartService.getCartItemsByShoppingCartId(email);
            return cart;
        } catch (Exception e) {
            return (List<CartItem>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping({"/addCartItem"})
    public ResponseEntity addCartItem(@RequestParam("idCart") Long idCart,
                                  @RequestParam("idBook") Long idBook,
                                  @RequestParam("quantity") int quantity) {
        try {
            shoppingCartService.addProductToCart(idCart, idBook, quantity);
            return ResponseEntity.status(HttpStatus.OK).body("Adding product to cart has been successful");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping({"/updateCartItem"})
    public ResponseEntity updateCartItem(@RequestParam("idCart") Long idCart,
                                      @RequestParam("idBook") Long idBook,
                                      @RequestParam("quantity") int quantity) {
        try {
            shoppingCartService.updateCartItem(idCart, idBook, quantity);
            return ResponseEntity.status(HttpStatus.OK).body("update product in cart has been successful");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping({"/deleteCartItem"})
    public ResponseEntity deleteCart(@RequestParam("idCart") Long idCart,
                                     @RequestParam("idBook") Long idBook) {
        try {
            shoppingCartService.deleteProductInCart(idCart, idBook);
            return ResponseEntity.status(HttpStatus.OK).body("deleting product to cart has been successful");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }
    }
}


