package com.works.repositories;

import com.works.entities.Order;
import com.works.entities.projections.IAllOrders;
import com.works.entities.projections.IOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select o.oid, p.brand,p.title,p.price,p.stock,count(p.pid) as Quantity from product as p inner join `order` as o on p.pid = o.pid\n" +
            "        where o.uid =?1 group by o.pid",nativeQuery = true)
    List<IOrder> orders(Long uid);
    @Query(value = "select u.email,p.brand,p.title,p.price,p.stock, count(p.pid) as Quantity from user as u\n" +
            "inner join `order` o on u.uid = o.uid inner join product p on o.pid = p.pid group by o.pid",nativeQuery = true)
    List<IAllOrders> allOrders();
}