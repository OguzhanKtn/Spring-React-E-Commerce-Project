package com.works.services;

import com.works.config.Rest;
import com.works.entities.Product;
import com.works.entities.projections.IProductCategory;
import com.works.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    final ProductRepository productRepository;

    public ResponseEntity save(Product product){
        try {
            productRepository.save(product);
            Rest rest = new Rest(true,product);
            ResponseEntity responseEntity = new ResponseEntity<>(rest, HttpStatus.OK);
            return  responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest, HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity listProducts(int page){
        Page<Product> products = productRepository.findAll(PageRequest.of(page,10, Sort.by(Sort.Direction.DESC,"pid")));
        try{
            ResponseEntity responseEntity = new ResponseEntity<>(products,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity allProducts(){
        List<Product> products = productRepository.findAll();
        HashMap map = new HashMap<>();
        map.put("products",products);
        try{
            ResponseEntity responseEntity = new ResponseEntity<>(map,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity productDetail(Long id){
        Optional<Product> product = productRepository.findById(id);

        try{
            if(product.isPresent()){
                ResponseEntity responseEntity = new ResponseEntity<>(product.get(),HttpStatus.OK);
                return responseEntity;
            }

        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
        return null;
    }

    public ResponseEntity productDelete(Long id){
        Optional<Product> product = productRepository.findById(id);
        try {
            if(product.isPresent()){
                productRepository.deleteById(id);
                Rest rest = new Rest(true,product);
                ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
                return responseEntity;
            }
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
        return null;
    }

    public ResponseEntity productUpdate(Product product){
        Optional<Product> prd = productRepository.findById(product.getPid());
        try{
            if(prd.isPresent()){
                prd.get().setBrand(product.getBrand());
                prd.get().setCid(product.getCid());
                prd.get().setTitle(product.getTitle());
                prd.get().setStock(product.getStock());
                prd.get().setPrice(product.getPrice());
                productRepository.saveAndFlush(prd.get());
                Rest rest = new Rest(true,product);
                ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.OK);
                return responseEntity;
            }

        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
        return null;
    }

    public ResponseEntity listByCategory(Integer cid){
        List<IProductCategory> products = productRepository.list(cid);
        HashMap map = new LinkedHashMap();
        map.put("products",products);
        try {
            ResponseEntity responseEntity = new ResponseEntity<>(map,HttpStatus.OK);
            return  responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

}
