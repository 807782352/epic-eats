package com.epiceats.epiceats.dao.order;

import com.epiceats.epiceats.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderDao {

    List<Order> selectAllOrders();

    Optional<Order> selectOrderById(Long id);

    boolean existsOrderById(Long id);

    Order insertOrder(Order order);

    void updateOrder(Order order);

    // Logically delete
    // void deleteOrderById(Long id);
}
