package com.epiceats.epiceats.dto.order;

import com.epiceats.epiceats.entity.OrderItem;

import java.util.List;

public record OrderResponse(
        Long orderId,
        Long userId,
        String userName,
        String email,
        String phone,
        List<OrderItem> orderItems,
        String status,
        Double totalPrice,
        String orderDate
){
}
