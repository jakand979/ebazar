package com.example.e_bazar.repository;

import com.example.e_bazar.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(Long productId);
    @Query("SELECT MIN(p.price) FROM Product p WHERE p.categoryId = :categoryId AND p.subcategoryId = :subcategoryId")
    BigDecimal findMinPriceByCategoryIdAndSubcategoryId(@Param("categoryId") Long categoryId,
                                                        @Param("subcategoryId") Long subcategoryId);
    @Query("SELECT MAX(p.price) FROM Product p WHERE p.categoryId = :categoryId AND p.subcategoryId = :subcategoryId")
    BigDecimal findMaxPriceByCategoryIdAndSubcategoryId(@Param("categoryId") Long categoryId,
                                                        @Param("subcategoryId") Long subcategoryId);
    @Query("SELECT DISTINCT p.size FROM Product p WHERE p.categoryId = :categoryId AND p.subcategoryId = :subcategoryId " +
            "AND p.price BETWEEN :minPrice AND :maxPrice")
    List<String> findDistinctSizesByCategoryIdAndSubcategoryIdAndPriceRange(@Param("categoryId") Long categoryId,
                                                                            @Param("subcategoryId") Long subcategoryId,
                                                                            @Param("minPrice") BigDecimal minPrice,
                                                                            @Param("maxPrice") BigDecimal maxPrice);
    @Query("SELECT DISTINCT p.color FROM Product p WHERE p.categoryId = :categoryId AND p.subcategoryId = :subcategoryId " +
            "AND p.price BETWEEN :minPrice AND :maxPrice")
    List<String> findDistinctColorsByCategoryIdAndSubcategoryIdAndPriceRange(@Param("categoryId") Long categoryId,
                                                                          @Param("subcategoryId") Long subcategoryId,
                                                                          @Param("minPrice") BigDecimal minPrice,
                                                                          @Param("maxPrice") BigDecimal maxPrice);
    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.categoryId = :categoryId AND p.subcategoryId = :subcategoryId " +
            "AND p.price BETWEEN :minPrice AND :maxPrice")
    List<String> findDistinctBrandsByCategoryIdAndSubcategoryIdAndPriceRange(@Param("categoryId") Long categoryId,
                                                                             @Param("subcategoryId") Long subcategoryId,
                                                                             @Param("minPrice") BigDecimal minPrice,
                                                                             @Param("maxPrice") BigDecimal maxPrice);
    @Query("SELECT p FROM Product p WHERE " +
            "p.categoryId = :categoryId AND " +
            "p.subcategoryId = :subcategoryId AND " +
            "p.price BETWEEN :minPrice AND :maxPrice AND " +
            "(:sizes IS NULL OR p.size IN :sizes) AND " +
            "(:colors IS NULL OR p.color IN :colors) AND " +
            "(:brands IS NULL OR p.brand IN :brands)")
    List<Product> findProductsByCategoryAndSubcategoryWithFilters(
            @Param("categoryId") Long categoryId,
            @Param("subcategoryId") Long subcategoryId,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("sizes") List<String> sizes,
            @Param("colors") List<String> colors,
            @Param("brands") List<String> brands);
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :searchText, '%')) AND " +
            "p.price BETWEEN :minPrice AND :maxPrice AND " +
            "(:sizes IS NULL OR p.size IN :sizes) AND " +
            "(:colors IS NULL OR p.color IN :colors) AND " +
            "(:brands IS NULL OR p.brand IN :brands)")
    List<Product> findByNameContainingIgnoreCaseWithFilters(
            @Param("searchText") String searchText,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("sizes") List<String> sizes,
            @Param("colors") List<String> colors,
            @Param("brands") List<String> brands);
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<Product> findByNameContainingIgnoreCase(@Param("searchText") String searchText);
    @Query("SELECT p FROM Product p WHERE p.productId IN :productIds")
    List<Product> findProductsByIds(@Param("productIds") List<Long> productIds);
}
