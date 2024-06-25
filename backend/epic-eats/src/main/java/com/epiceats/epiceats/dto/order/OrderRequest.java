package com.epiceats.epiceats.dto.order;

import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;

import java.util.List;

public record OrderRequest (
    Double totalPrice,
    List<OrderItemRequest> orderItems
){
}
