package com.works.repositories;

import com.works.entities.Order;
import com.works.entities.projections.IOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select o.oid, p.brand,p.title,p.price,p.stock from product as p inner join `order` as o on p.pid = o.pid\n" +
            "where o.uid =?1",nativeQuery = true)
    List<IOrder> orders(Long uid);

}