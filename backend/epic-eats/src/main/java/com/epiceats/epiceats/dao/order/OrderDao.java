package com.epiceats.epiceats.dao.order;

import com.epiceats.epiceats.entity.Orders;

import java.util.List;
import java.util.Optional;

public interface OrderDao {

    List<Orders> selectAllOrders();

    Optional<Orders> selectOrderById(Long id);

    boolean existsOrderById(Long id);

    Orders insertOrder(Orders order);

    void updateOrder(Orders order);

    // Logically delete
    // void deleteOrderById(Long id);
}
