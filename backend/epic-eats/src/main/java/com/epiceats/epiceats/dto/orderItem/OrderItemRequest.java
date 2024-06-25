package com.epiceats.epiceats.dto.orderItem;

public record OrderItemRequest(
        Long orderId,
        Long dishId,
        Integer quantity,
        Double price
) {
}
