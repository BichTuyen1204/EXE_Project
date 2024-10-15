package com.example.fbookStore.service;


import com.example.fbookStore.entities.Category;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.repository.CategoryRepository;
import com.example.fbookStore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    public Category addNewCategory(Category category) {
        return categoryRepository.save(category);
    }

    public String deleteCategory(Long idCategory) {
        Optional<Category> category = categoryRepository.findById(idCategory);
        if (category.isEmpty()) {
            return "Can't find the id category: " + idCategory;
        } else {
            categoryRepository.deleteById(idCategory);
            return "Delete successful the id category: " + idCategory;
        }
    }

    public String updateCategory(Category category) {
        categoryRepository.updateCategory(
                category.getIdCategory(),
                category.getName()
        );
        return "Update id category successful";
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }


    public Category getCategoryId(Long idCategory) {
        Optional<Category> optionalCategory = categoryRepository.findById(idCategory);
        return optionalCategory.orElse(null);
    }
}
