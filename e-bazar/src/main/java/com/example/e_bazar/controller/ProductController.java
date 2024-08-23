package com.example.e_bazar.controller;

import com.example.e_bazar.model.Product;
import com.example.e_bazar.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

class ProductParams {
    private String name;
    private BigDecimal price;
    private Long categoryId;
    private Long subcategoryId;
    private String color;
    private String size;
    private String brand;
    private String img;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getSubcategoryId() {
        return subcategoryId;
    }

    public void setSubcategoryId(Long subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/minmax/{categoryId}/{subcategoryId}")
    public Map<String, BigDecimal> getMinMaxPrice(@PathVariable Long categoryId, @PathVariable Long subcategoryId) {
        BigDecimal minPrice = productService.getMinPrice(categoryId, subcategoryId);
        BigDecimal maxPrice = productService.getMaxPrice(categoryId, subcategoryId);
        Map<String, BigDecimal> response = new HashMap<>();
        response.put("minPrice", minPrice);
        response.put("maxPrice", maxPrice);
        return response;
    }

    @GetMapping("/distinctsizes/{categoryId}/{subcategoryId}")
    public List<String> getDistinctSizes(@PathVariable Long categoryId, @PathVariable Long subcategoryId,
                                         @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        return productService.getDistinctSizes(categoryId, subcategoryId, minPrice, maxPrice);
    }

    @GetMapping("/distinctcolors/{categoryId}/{subcategoryId}")
    public List<String> getDistinctColors(@PathVariable Long categoryId, @PathVariable Long subcategoryId,
                                          @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        return productService.getDistinctColors(categoryId, subcategoryId, minPrice, maxPrice);
    }

    @GetMapping("/distinctbrands/{categoryId}/{subcategoryId}")
    public List<String> getDistinctBrands(@PathVariable Long categoryId, @PathVariable Long subcategoryId,
                                          @RequestParam BigDecimal minPrice, @RequestParam BigDecimal maxPrice) {
        return productService.getDistinctBrands(categoryId, subcategoryId, minPrice, maxPrice);
    }

    @GetMapping("/allproducts/{categoryId}/{subcategoryId}")
    public List<Product> getProductsByCategoryAndSubcategory(@PathVariable Long categoryId,
                                                             @PathVariable Long subcategoryId,
                                                             @RequestParam(required = false) BigDecimal minPrice,
                                                             @RequestParam(required = false) BigDecimal maxPrice,
                                                             @RequestParam(required = false) List<String> sizes,
                                                             @RequestParam(required = false) List<String> colors,
                                                             @RequestParam(required = false) List<String> brands) {
        return productService.findProductsByCategoryAndSubcategoryWithFilters(categoryId, subcategoryId, minPrice,
                maxPrice, sizes, colors, brands);
    }

    @GetMapping("/search/{searchText}")
    public List<Product> searchProducts(@PathVariable String searchText,
                                        @RequestParam(required = false) BigDecimal minPrice,
                                        @RequestParam(required = false) BigDecimal maxPrice,
                                        @RequestParam(required = false) List<String> sizes,
                                        @RequestParam(required = false) List<String> colors,
                                        @RequestParam(required = false) List<String> brands) {
        if (minPrice == null && maxPrice == null) return productService.findByNameContainingIgnoreCase(searchText);
        return productService.findByNameContainingIgnoreCaseWithFilters(searchText,
                minPrice, maxPrice, sizes, colors, brands);
    }

    @GetMapping("/search-min-max/{searchText}")
    public Map<String, BigDecimal> searchProductsMinMax(@PathVariable String searchText) {
        List<Product> productsFound = productService.findByNameContainingIgnoreCase(searchText);
        Optional<BigDecimal> minPrice = productsFound.stream()
                .map(Product::getPrice)
                .min(BigDecimal::compareTo);
        Optional<BigDecimal> maxPrice = productsFound.stream()
                .map(Product::getPrice)
                .max(BigDecimal::compareTo);
        Map<String, BigDecimal> response = new HashMap<>();
        if (minPrice.isPresent() && maxPrice.isPresent()) {
            response.put("minPrice", minPrice.get());
            response.put("maxPrice", maxPrice.get());
        }
        return response;
    }

    @GetMapping("/search-distinct-sizes/{searchText}")
    public List<String> searchProductsSizes(@PathVariable String searchText,
                                            @RequestParam(required = false) BigDecimal minPrice,
                                            @RequestParam(required = false) BigDecimal maxPrice) {
        List<Product> productsFound = productService.findByNameContainingIgnoreCase(searchText);
        if (minPrice == null && maxPrice == null) return null;
        return productsFound.stream()
                .filter(p -> p.getPrice().compareTo(minPrice) >= 0 && p.getPrice().compareTo(maxPrice) <= 0)
                .map(Product::getSize)
                .distinct()
                .toList();
    }

    @GetMapping("/search-distinct-colors/{searchText}")
    public List<String> searchProductsColors(@PathVariable String searchText,
                                             @RequestParam(required = false) BigDecimal minPrice,
                                             @RequestParam(required = false) BigDecimal maxPrice) {
        List<Product> productsFound = productService.findByNameContainingIgnoreCase(searchText);
        if (minPrice == null && maxPrice == null) return null;
        return productsFound.stream()
                .filter(p -> p.getPrice().compareTo(minPrice) >= 0 && p.getPrice().compareTo(maxPrice) <= 0)
                .map(Product::getColor)
                .distinct()
                .toList();
    }

    @GetMapping("/search-distinct-brands/{searchText}")
    public List<String> searchProductsBrands(@PathVariable String searchText,
                                             @RequestParam(required = false) BigDecimal minPrice,
                                             @RequestParam(required = false) BigDecimal maxPrice) {
        List<Product> productsFound = productService.findByNameContainingIgnoreCase(searchText);
        if (minPrice == null && maxPrice == null) return null;
        return productsFound.stream()
                .filter(p -> p.getPrice().compareTo(minPrice) >= 0 && p.getPrice().compareTo(maxPrice) <= 0)
                .map(Product::getBrand)
                .distinct()
                .toList();
    }

    @GetMapping("/by-ids")
    public List<Product> getProductsByIds(@RequestParam String productIds) {
        List<Long> productIdsList = Arrays.stream(productIds.split(","))
                .map(Long::parseLong)
                .toList();
        return productService.findProductsByIds(productIdsList);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/delete/{productId}")
    public void deleteProductById(@PathVariable Long productId) {
        productService.removeProduct(productId);
    }

    @PostMapping("/add")
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @PutMapping("/update/{productId}")
    public Product updateProduct(@PathVariable Long productId, @RequestBody Product newProduct) {
        Product product = productService.getProductById(productId);
        product.setProductId(productId);
        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setCategoryId(newProduct.getCategoryId());
        product.setSubcategoryId(newProduct.getSubcategoryId());
        product.setColor(newProduct.getColor());
        product.setSize(newProduct.getSize());
        product.setBrand(newProduct.getBrand());
        product.setImg(newProduct.getImg());
        return productService.updateProduct(product);
    }
}
