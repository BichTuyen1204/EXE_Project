package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Category;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
//    Optional<Category> findByNameCategory(String name);
    @Modifying
    @Transactional
    @Query("update Category ca "
    + "set ca.name = :name "
    + "where ca.idCategory = :idCategory")

    void updateCategory(
            @Param(value="idCategory") Long idCategory,
            @Param(value="name") String name
    );
}
