package com.works.controllers;

import com.works.entities.Product;
import com.works.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
@CrossOrigin
public class ProductController {

    final ProductService productService;

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Product product){
        return productService.save(product);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Product product){
        return productService.productUpdate(product);
    }

    @GetMapping("/delete/{pid}")
    public ResponseEntity delete(@PathVariable Long pid){
        return productService.productDelete(pid);
    }

    @GetMapping("/listSomeProducts")
    public ResponseEntity list(){
        return productService.listProducts();
    }

    @GetMapping("/listAllProducts")
    public ResponseEntity listAll(){
        return productService.allProducts();
    }

    @GetMapping("/detail/{pid}")
    public ResponseEntity detail(@PathVariable Long pid){
        return productService.productDetail(pid);
    }

    @GetMapping("/listByCategory/{cid}")
    public ResponseEntity listByCategory(@PathVariable Integer cid){
        return productService.listByCategory(cid);
    }
}
