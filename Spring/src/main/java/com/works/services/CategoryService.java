package com.works.services;

import com.works.config.Rest;
import com.works.entities.Category;
import com.works.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {

    final CategoryRepository categoryRepository;

    public ResponseEntity save(Category category){
        try{
            categoryRepository.save(category);
            Rest rest = new Rest(true,category);
            ResponseEntity responseEntity = new ResponseEntity(rest, HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity listCategories(){
        try{
            Rest rest = new Rest(true,categoryRepository.findAll());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity updateCategory(Category category){
        Optional<Category> ctgry = categoryRepository.findById(category.getCid());
        try{
            if(ctgry.isPresent()){
                ctgry.get().setName(category.getName());
                categoryRepository.saveAndFlush(ctgry.get());
            }
            Rest rest = new Rest(true,category);
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity deleteCategory(Long cid){
        Optional<Category> category = categoryRepository.findById(cid);
         try{
             if(category.isPresent()) {
                 categoryRepository.deleteById(cid);
                 Rest rest = new Rest(true,category.get());
                 ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
                 return responseEntity;
             }
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
         return null;
    }


}
