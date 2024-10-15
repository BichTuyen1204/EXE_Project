package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Category;
import com.example.fbookStore.entities.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.category.idCategory = :idCategory and p.status = null" )
    List<Product> findByIdCategory(@Param("idCategory")  Long idCategory);

    @Query("SELECT p FROM Product p WHERE p.status = null")
    List<Product> findAllProduct();



    @Modifying
    @Transactional
    @Query("update Product p "
            + "set p.image = :image,"
            + " p.title = :title,"
            + " p.place_production = :place_production,"
            +   "p.category = :category, "
            + "p.describle = :describle,"
            + " p.weight = :weight, "
            + " p.quantity = :quantity, "
            + " p.starNumber = :starNumber, "
            + " p.price = :price "
            + "where p.idBook = :idBook")
    void updateProduct(
            @Param(value="idBook") Long idBook,
            @Param(value="image") String image,
            @Param(value="title") String title,
            @Param(value="place_production") String place_production,
            @Param(value="category") Category category,
            @Param(value="describle") String describle,
            @Param(value="weight") String weight,
            @Param(value="quantity") int quantity,
            @Param(value="starNumber") int starNumber,
            @Param(value="price") float price
    );



    @Modifying
    @Transactional
    @Query("update Product p "
            + "set p.image = :image "

            + "where p.idBook = :idBook")
    void updateImageProduct(
            @Param(value="idBook") Long idBook,
            @Param(value="image") String image
    );



    @Modifying
    @Transactional
    @Query("update Product p "
            + "set p.status = :status "

            + "where p.idBook = :idBook")
    void deleteProduct(
            @Param(value="idBook") Long idBook,
            @Param(value="status") String status
    );

    //List<Product> findAllByPrice(double price, Pageable pageable);


}
