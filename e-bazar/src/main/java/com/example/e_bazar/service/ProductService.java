package com.example.e_bazar.service;

import com.example.e_bazar.model.Product;
import com.example.e_bazar.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public BigDecimal getMinPrice(Long categoryId, Long subcategoryId) {
        return productRepository.findMinPriceByCategoryIdAndSubcategoryId(categoryId, subcategoryId);
    }

    public BigDecimal getMaxPrice(Long categoryId, Long subcategoryId) {
        return productRepository.findMaxPriceByCategoryIdAndSubcategoryId(categoryId, subcategoryId);
    }

    public List<String> getDistinctSizes(Long categoryId, Long subcategoryId, BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findDistinctSizesByCategoryIdAndSubcategoryIdAndPriceRange(categoryId, subcategoryId,
                minPrice, maxPrice);
    }

    public List<String> getDistinctColors(Long categoryId, Long subcategoryId, BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findDistinctColorsByCategoryIdAndSubcategoryIdAndPriceRange(categoryId, subcategoryId,
                minPrice, maxPrice);
    }

    public List<String> getDistinctBrands(Long categoryId, Long subcategoryId, BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findDistinctBrandsByCategoryIdAndSubcategoryIdAndPriceRange(categoryId, subcategoryId,
                minPrice, maxPrice);
    }

    public List<Product> findProductsByCategoryAndSubcategoryWithFilters(Long categoryId, Long subcategoryId,
                                                                         BigDecimal minPrice, BigDecimal maxPrice,
                                                                         List<String> sizes, List<String> colors,
                                                                         List<String> brands) {
        return productRepository.findProductsByCategoryAndSubcategoryWithFilters(categoryId, subcategoryId, minPrice,
                maxPrice, sizes, colors, brands);
    }

    public List<Product> findByNameContainingIgnoreCaseWithFilters(String searchText, BigDecimal minPrice,
                                                                   BigDecimal maxPrice, List<String> sizes,
                                                                   List<String> colors, List<String> brands) {
        return productRepository.findByNameContainingIgnoreCaseWithFilters(searchText, minPrice, maxPrice, sizes,
                colors, brands);
    }

    public List<Product> findByNameContainingIgnoreCase(String searchText) {
        return productRepository.findByNameContainingIgnoreCase(searchText);
    }

    public List<Product> findProductsByIds(List<Long> productIds) {
        return productRepository.findProductsByIds(productIds);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void removeProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public void addProduct(Product product) {
        productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long productId) {
        return productRepository.findByProductId(productId);
    }
}
