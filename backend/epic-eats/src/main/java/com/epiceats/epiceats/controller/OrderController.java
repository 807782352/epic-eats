package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.order.OrderResponse;
import com.epiceats.epiceats.service.OrderService;
import com.epiceats.epiceats.utils.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    public Result<List<OrderResponse>> getOrdersById() {
        // TODO: 需要userservice, orderService 和 orderItemService
        return null;
    }
}
