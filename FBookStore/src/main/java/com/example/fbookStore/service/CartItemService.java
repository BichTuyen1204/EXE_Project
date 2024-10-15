package com.example.fbookStore.service;

import com.example.fbookStore.entities.CartItem;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.repository.CartItemRepository;
import com.example.fbookStore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ProductRepository productRepository;

    public List<CartItem> getAllCartAdmin(){
        return cartItemRepository.findAll();
    }

    public CartItem getCartId(Long idCart) {
        Optional<CartItem> optionalCartItem = cartItemRepository.findById(idCart);
        return optionalCartItem.orElse(null);
    }

    public String deleteCart(Long idCart) {
        Optional<CartItem> cartItem = cartItemRepository.findById(idCart);
        if (cartItem.isEmpty()) {
            return "Cannot find the cart with id: " + idCart;
        } else {
            cartItemRepository.deleteById(idCart);
            return "Deleted successfully a cart with id: " + idCart;
        }
    }


//    public String updateCart(CartItem cartItem) {
//        cartItemRepository.updateCartItem(
//                cartItem.getIdCartItem(),
//                cartItem.getQuantity()
//        );
//        return "Update a cart Successfully";
//    }


//    public String addToCart(Product product, int quantity, Long idCart) {
//        for (CartItem item : cartItems) {
//            if (item.getProduct().getIdBook().equals(product.getIdBook())){
//                item.setQuantity(item.getQuantity() + quantity);
//                return "Updated";
//            }
//        }
//        CartItem newItem = new CartItem();
//        cartItems.add(newItem);
//        return "OK";
//    }
}
