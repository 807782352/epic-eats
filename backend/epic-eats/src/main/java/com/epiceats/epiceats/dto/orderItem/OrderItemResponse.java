package com.epiceats.epiceats.dto.orderItem;

public record OrderItemResponse (
        Long dishId,
        String dishName,
        Integer quantity,
        Double price
){
}
