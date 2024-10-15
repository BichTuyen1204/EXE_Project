package com.example.fbookStore.repository;

import com.example.fbookStore.entities.CartItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Modifying
    @Transactional
    @Query("delete CartItem cartItem "
            + "where cartItem.shoppingCart.id = :idCart")
    void deleteCartItemByIdCart(
            @Param(value="idCart") Long idCart
    );

    @Modifying
    @Transactional
    @Query("delete CartItem cartItem "
            + "where cartItem.product.idBook = :idBook")
    void deleteCartItemByIdBook(
            @Param(value="idBook") Long idBook
    );

    @Query("SELECT c FROM CartItem c WHERE c.product.idBook = :idBook AND c.shoppingCart.id = :cartId")
    Optional<CartItem> findCartItemByIdBookAndIdCart(@Param("cartId") Long cartId, @Param("idBook") Long idBook);


    List<CartItem> findByShoppingCartId(Long shoppingCartId);



}
