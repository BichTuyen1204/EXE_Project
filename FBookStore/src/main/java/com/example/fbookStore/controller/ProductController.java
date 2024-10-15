package com.example.fbookStore.controller;

import com.example.fbookStore.entities.Category;
import com.example.fbookStore.entities.PaginationResult;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/product")

@ComponentScan
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping({"/addNew"})
    public ResponseEntity addNewProduct(@RequestParam("file") MultipartFile file,
                                        @RequestParam("title") String title,
                                        @RequestParam("place_production") String place_production,
                                        @RequestParam("price") float price,
                                        @RequestParam("describe") String describe,
                                        @RequestParam("weight") String weight,
                                        @RequestParam("idCategory") Category idCategory,
                                        @RequestParam("quantity") int quantity) throws IOException {
        try {
            if (productService.saveFile(file)) {
                String imageName = file.getOriginalFilename();
                productService.addNewProduct(imageName, title, place_production, price, describe, weight, quantity, idCategory);
                return ResponseEntity.status(HttpStatus.OK).body("Create product has been successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing property of account");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }
    }


    @GetMapping("/getProduct/{idBook}")
    public ResponseEntity<Product> getProductById(@PathVariable Long idBook) {
        Product product = productService.getProductById(idBook);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping({"/getAllProducts/{pageNumber}"})
    public PaginationResult<Product> getAllProducts(@PathVariable("pageNumber") int pageNumber) {
        return productService.getAllProducts(pageNumber);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping({"/getAllProductsAdmin"})
    public List<Product> getAllProductsAdmin() {
        return productService.getAllProductsAdmin();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity deleteProduct(@PathVariable("id") Long id) {
        try {
            if (Objects.isNull(id)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing id");
            }
            String message = productService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body(message);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping({"/update"})
    public ResponseEntity updateAProduct(@RequestBody Product product) {
        String message = productService.updateProduct(product);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping({"/updateImageProduct"})
    public ResponseEntity updateImageProduct(@RequestParam("idBook") Long idBook,
                                             @RequestParam("file") MultipartFile file) {
        try {
            if (productService.saveFile(file)) {
                String imageName = file.getOriginalFilename();
                productService.updateImageProduct(idBook, imageName);
                return ResponseEntity.status(HttpStatus.OK).body(productService.updateImageProduct(idBook, imageName));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("can't save image");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when update image product: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping({"/deleteProduct"})
    public ResponseEntity deleteProduct(@RequestParam("idBook") Long idBook,
                                        @RequestParam("status") String status) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(productService.deleteProduct(idBook, status));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when delete a product: " + e.getMessage());
        }
    }


//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping({"/update"})
//    public ResponseEntity updateAProduct(
//            @RequestParam("idBook") Long idBook,
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("title") String title,
//            @RequestParam("place_production") String place_production,
//            @RequestParam("price") float price,
//            @RequestParam("describe") String describe,
//            @RequestParam("age") int age,
//            @RequestParam("idCategory") Category idCategory,
//            @RequestParam("quantity") int quantity) {
//        //String message = productService.updateProduct(product);
//        return ResponseEntity.status(HttpStatus.OK).body("l");
//    }

    @GetMapping("/products/category")
    public PaginationResult<Product> getProductByCategory(@RequestParam("idCategory") Long idCategory,
                                                          @RequestParam("pageNumber") int pageNumber) {
        return productService.getProductByCategory(idCategory, pageNumber);
    }

    @GetMapping("/products/categoryexception")
    public PaginationResult<Product> getProductByCategoryException(@RequestParam("idCategory") Long idCategory,
                                                                   @RequestParam("pageNumber") int pageNumber,
                                                                   @RequestParam("idBook") long idBook) {
        return productService.getProductByCategoryException(idCategory, pageNumber, idBook);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search")
    public ResponseEntity<PaginationResult<Product>> searchProducts(@RequestParam("keyword") String keyword,
                                                                    @RequestParam("pageNumber") int pageNumber) {
        PaginationResult<Product> foundProducts = productService.searchProducts(keyword, pageNumber);
        return ResponseEntity.ok(foundProducts);
    }

//    @GetMapping("/byCategory/{idCategory}")
//    public ResponseEntity<List<Product>> getProductsByIdCategory(@PathVariable Long idCategory) {
//        List<Product> products = productService.getProductsByIdCategory(idCategory);
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }
}
