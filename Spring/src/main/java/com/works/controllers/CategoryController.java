package com.works.controllers;

import com.works.entities.Category;
import com.works.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    final CategoryService categoryService;

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Category category){
       return categoryService.save(category);
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

    @GetMapping("/delete/{cid}")
    public ResponseEntity delete(@PathVariable Long cid){
        return categoryService.deleteCategory(cid);
    }

    @GetMapping("/list")
    public ResponseEntity list(){
        return categoryService.listCategories();
    }
}
