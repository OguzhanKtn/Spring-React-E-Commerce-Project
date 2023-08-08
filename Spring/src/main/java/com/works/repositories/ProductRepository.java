package com.works.repositories;

import com.works.entities.Product;
import com.works.entities.projections.IProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select p.pid, p.brand,p.price,p.stock,p.title from product as p inner join category c on p.cid = c.cid\n" +
            "where p.cid = ?1",nativeQuery = true)
    List<IProductCategory> list(Integer cid);

}