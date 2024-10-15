package com.example.fbookStore.service;

import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.CartItem;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.entities.ShoppingCart;
import com.example.fbookStore.repository.AccountRepository;
import com.example.fbookStore.repository.CartItemRepository;
import com.example.fbookStore.repository.ProductRepository;
import com.example.fbookStore.repository.ShoppingCartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@ComponentScan
public class ShoppingCartService {
    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProductRepository productRepository;


    public void addNewCart(Account account) {
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setAccount(account);
        List<CartItem> cartItemList = new ArrayList<>();
        //shoppingCart.setCartItemList(cartItemList);
        shoppingCartRepository.save(shoppingCart);
    }

    public ShoppingCart getShoppingCart(String email) {
        //Optional<Account> account = accountRepository.findByEmail(email);
        Long idCart = shoppingCartRepository.findIdCartByEmail(email);
        ShoppingCart shoppingCart = shoppingCartRepository.findCartByEmail(email);
        List<CartItem> cartItemList = cartItemRepository.findByShoppingCartId(idCart);
        for (CartItem item : cartItemList) {
            Optional<Product> product = productRepository.findById(item.getProduct().getIdBook());
            if (product.isPresent()) {

            }
        }
        return shoppingCart;
    }

    public Long idShoppingCart(String email) {
        return shoppingCartRepository.findIdCartByEmail(email);
    }


    @Transactional
    public void addProductToCart(Long cartId, Long idBook, int quantity) {
        // Retrieve the cart
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Retrieve the product
        Product product = productRepository.findById(idBook)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() >= quantity) {
            // Check for existing CartItem
            Optional<CartItem> existingCartItem = cartItemRepository.findCartItemByIdBookAndIdCart(cartId, idBook);
            if (existingCartItem.isPresent()) {
                // Product is already in the cart, update the quantity
                CartItem cartItem = existingCartItem.get();

                //check quantity in cart with quantity of product
                if (cartItem.getQuantity() >= product.getQuantity()) {
                    cartItem.setQuantity(product.getQuantity());
                } else {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                }
                cartItemRepository.save(cartItem);

            } else {
                // Product is not in the cart, create a new CartItem
                CartItem newCartItem = new CartItem();
                newCartItem.setShoppingCart(cart);
                newCartItem.setProduct(product);
                newCartItem.setQuantity(quantity);

                cartItemRepository.save(newCartItem);
            }
        } else {
            throw new RuntimeException("The product is not enough");
        }
    }

    @Transactional
    public void updateCartItem(Long cartId, Long idBook, int quantity) {
        // Retrieve the cart
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Retrieve the product
        Product product = productRepository.findById(idBook)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() >= quantity) {
            // Check for existing CartItem
            Optional<CartItem> existingCartItem = cartItemRepository.findCartItemByIdBookAndIdCart(cartId, idBook);
            if (existingCartItem.isPresent()) {
                // Product is already in the cart, update the quantity
                CartItem cartItem = existingCartItem.get();

                cartItem.setQuantity(quantity);

                cartItemRepository.save(cartItem);
            }
        } else {
            throw new RuntimeException("The product is not enough");
        }
    }


    @Transactional
    public void deleteProductInCart(Long cartId, Long idBook) {
        // Retrieve the cart
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        Optional<CartItem> existingCartItem = cartItemRepository.findCartItemByIdBookAndIdCart(cartId, idBook);

        List<CartItem> cartItemList;
        cartItemList = cartItemRepository.findByShoppingCartId(cartId);

        if (existingCartItem.isPresent()) {
            cartItemList.remove(existingCartItem.get());
            cart.setCartItemListNew(cartItemList);
            shoppingCartRepository.save(cart);
            cartItemRepository.delete(existingCartItem.get());
        }
    }

    public List<CartItem> getCartItemsByShoppingCartId(String email) {
        return cartItemRepository.findByShoppingCartId(idShoppingCart(email));
    }


}
