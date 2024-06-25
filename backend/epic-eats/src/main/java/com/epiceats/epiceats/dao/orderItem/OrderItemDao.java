package com.epiceats.epiceats.dao.orderItem;

import com.epiceats.epiceats.entity.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemDao {
    List<OrderItem> selectAllOrderItems();

    Optional<OrderItem> selectOrderItemById(Long id);

    List<OrderItem> selectOrderItemsByOrderId(Long orderId);
    
    boolean existsOrderItemById(Long id);

    void insertOrderItem(OrderItem orderItem);

    void updateOrderItem(OrderItem orderItem);
}
