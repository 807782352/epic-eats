package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.order.OrderRequest;
import com.epiceats.epiceats.dto.order.OrderResponse;
import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;
import com.epiceats.epiceats.service.OrderItemService;
import com.epiceats.epiceats.service.OrderService;
import com.epiceats.epiceats.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/order")
public class OrderController {
    private final OrderService orderService;

    private final OrderItemService orderItemService;

    public OrderController(OrderService orderService, OrderItemService orderItemService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    @GetMapping()
    public Result<List<OrderResponse>> getOrders() {
        try {
            List<OrderResponse> orderResponses = orderService.getOrderResponses();
            return Result.success(orderResponses);
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public Result<OrderResponse> getOrdersById(@PathVariable("orderId") Long orderId) {
        try {
            OrderResponse orderResponse = orderService.getOrderResponseById(orderId);
            return Result.success(orderResponse);
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PostMapping()
    public Result<String> addOrder(@RequestBody OrderRequest orderRequest){
        try {
            orderService.addOrder(orderRequest);
            return Result.success("Add Order Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{orderId}")
    public Result<String> updateOrder(@PathVariable("orderId") Long orderId){

        try {
            orderService.updateOrderStatus(orderId);
            return Result.success("Update Order Status Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/item/{orderItemId}")
    public Result<String> updateOrder(@PathVariable("orderItemId") Long orderItemId, @RequestBody OrderItemRequest orderItemRequest){
        try {
            orderItemService.updateOrderItem(orderItemId, orderItemRequest);
            return Result.success("Update Order Status Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }


    @DeleteMapping("/{orderId}")
    public Result<String> deleteOrder(@PathVariable("orderId") Long orderId) {
        try {
            orderService.deleteOrderStatus(orderId);
            return Result.success("Archived Order Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
