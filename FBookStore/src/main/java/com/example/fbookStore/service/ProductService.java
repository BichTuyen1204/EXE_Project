package com.example.fbookStore.service;

import com.example.fbookStore.entities.Category;
import com.example.fbookStore.entities.PaginationResult;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.repository.CartItemRepository;
import com.example.fbookStore.repository.CategoryRepository;
import com.example.fbookStore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public boolean saveFile(MultipartFile file) throws IOException, URISyntaxException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");

        } else {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path storageLocation;
            try {
                URI uri = new URI(uploadDir);
                storageLocation = Paths.get(uri);
            } catch (Exception e) {
                // Fallback for non-URI paths, useful for direct filesystem paths
                storageLocation = Paths.get(uploadDir);
            }
            if (!Files.exists(storageLocation)) {
                Files.createDirectories(storageLocation);
            }
            Path destination = storageLocation.resolve(filename);
            file.transferTo(destination.toFile());
            return true;
        }
    }

    //Add product
    public Product addNewProduct(String imageName, String title, String place_production, float price, String describle, String weight, int quantity, Category idCategory) {
        Product product = new Product(imageName, title, place_production, price, describle, weight, quantity, idCategory);
        return productRepository.save(product);
    }

    // Find id of product
    public Product getProductById(Long idBook) {
        Optional<Product> optionalProduct = productRepository.findById(idBook);
        return optionalProduct.orElse(null);
    }

    // Call all products
    public PaginationResult<Product> getAllProducts(int pageNumber) {
        List<Product> allProduct = productRepository.findAllProduct();
        return pagination(pageNumber, allProduct);
    }

    // Show all product in admin page
    public List<Product> getAllProductsAdmin() {
        return productRepository.findAll();
    }

    // Delete is product in admin page
    public String deleteProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty()) {
            return "Cannot find the account with id: " + productId;
        } else {
            productRepository.deleteById(productId);
            return "Deleted successfully a account with id: " + productId;
        }
    }

    //Search product
    public PaginationResult<Product> searchProducts(String keyword, int pageNumber) {
        List<Product> allProducts = productRepository.findAll();

        List<Product> filteredProducts = allProducts.stream()
                .filter(product -> product.getTitle().toLowerCase().contains(keyword.toLowerCase()) && product.getStatus() == null)
                .collect(Collectors.toList());
        PaginationResult<Product> resultSearch = pagination(pageNumber, filteredProducts);
        return resultSearch;
    }

    //Update product
    public String updateProduct(Product product) {
        productRepository.updateProduct(
                product.getIdBook(),
                product.getImage(),
                product.getTitle(),
                product.getPlace_production(),
                product.getCategory(),
                product.getDescrible(),
                product.getWeight(),
                product.getQuantity(),
                product.getStarNumber(),
                product.getPrice()
        );
        return "Update a product Successfully";
    }

    public String updateImageProduct(Long idBook, String imageName) {
        productRepository.updateImageProduct(idBook, imageName);
        return "Update picture product Successfully";
    }

    public String deleteProduct(Long idBook, String status) {
        cartItemRepository.deleteCartItemByIdBook(idBook);
        productRepository.deleteProduct(idBook, status);
        return "Delete product successfully";
    }


    public PaginationResult<Product> getProductByCategory(Long idCategory, int pageNumber) {
        List<Product> products = productRepository.findByIdCategory(idCategory);
        PaginationResult<Product> caterogy = pagination(pageNumber, products);
        return caterogy;
    }

    public PaginationResult<Product> getProductByCategoryException(Long idCategory, int pageNumber, long idBook) {
        List<Product> products = productRepository.findByIdCategory(idCategory);
        products.removeIf(p -> p.getIdBook() == idBook);
        PaginationResult<Product> caterogy = pagination(pageNumber, products);
        return caterogy;
    }

    public PaginationResult<Product> pagination(int pageNumber, List<Product> allProducts) {
        int pageSize = 21;
        int totalItems = allProducts.size();

// Calculate start index and end index for pagination
        int startIndex = (pageNumber - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, totalItems);

// Get sublist of data for the specified page
        List<Product> dataForPage = allProducts.subList(startIndex, endIndex);

// Calculate total pages
        int totalPages = (int) Math.ceil((double) totalItems / pageSize);

// Create and return a PaginationResult object containing data for the page and pagination information
        return new PaginationResult<>(dataForPage, totalItems, totalPages);
    }
}
