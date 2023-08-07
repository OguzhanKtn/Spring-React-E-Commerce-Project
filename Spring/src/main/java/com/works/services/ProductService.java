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

    public ResponseEntity listProducts(){
        Page<Product> products = productRepository.findAll(PageRequest.of(0,20, Sort.by(Sort.Direction.DESC,"pid")));
        try{
            Rest rest = new Rest(true,products);
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity allProducts(){
        List<Product> products = productRepository.findAll();
        try{
            Rest rest = new Rest(true,products);
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
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
                Rest rest = new Rest(true,product.get());
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
        try {
            Rest rest = new Rest(true,products);
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
            return  responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

}
