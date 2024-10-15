package com.example.fbookStore.controller;

import com.example.fbookStore.entities.Category;
import com.example.fbookStore.repository.CategoryRepository;
import com.example.fbookStore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/category")
@CrossOrigin(origins = "http://localhost:3000")
@ComponentScan
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @PostMapping({"/add"})
    public Category addNewCategory(@RequestBody Category category){
        return categoryService.addNewCategory(category);
    }
    
    @DeleteMapping({"/delete/{idCategory}"})
    public ResponseEntity deleteCategory(@PathVariable("idCategory") Long idCategory){
        try{
            if (Objects.isNull(idCategory)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing id category");
            }
            String message = categoryService.deleteCategory(idCategory);
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when delete id category: " + e.getMessage());
        }
    }

    @PutMapping({"/update"})
    public ResponseEntity updateCategory(@RequestBody Category category){
        String message = categoryService.updateCategory(category);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }

    @GetMapping ({"/getAll"})
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }

    @GetMapping ({"/getId/{idCategory}"})
    public ResponseEntity<Category> getCategoryId(@PathVariable Long idCategory){
        Category category = categoryService.getCategoryId(idCategory);
        if (category != null){
            return new ResponseEntity<>(category, HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Test endpoint is working");
    }

}