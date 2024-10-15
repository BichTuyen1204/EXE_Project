package com.example.fbookStore.repository;

import com.example.fbookStore.entities.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    @Query("SELECT c.id FROM ShoppingCart c WHERE c.account.email =:email")
    Long findIdCartByEmail(String email);

    @Query("SELECT c FROM ShoppingCart c WHERE c.account.email =:email")
    ShoppingCart findCartByEmail(String email);
}
