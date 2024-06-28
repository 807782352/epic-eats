package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.dish.DishDao;
import com.epiceats.epiceats.dao.order.OrderDao;
import com.epiceats.epiceats.dao.orderItem.OrderItemDao;
import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;
import com.epiceats.epiceats.dto.orderItem.OrderItemResponse;
import com.epiceats.epiceats.entity.Dish;
import com.epiceats.epiceats.entity.Orders;
import com.epiceats.epiceats.entity.OrderItem;
import com.epiceats.epiceats.exception.DishNotFoundException;
import com.epiceats.epiceats.exception.OrderItemNotFoundException;
import com.epiceats.epiceats.exception.OrderNotFoundException;
import com.epiceats.epiceats.exception.RequestValidationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemService {
    private final OrderDao orderDao;

    private final OrderItemDao orderItemDao;

    private final DishDao dishDao;

    public OrderItemService(OrderDao orderDao, OrderItemDao orderItemDao, DishDao dishDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
        this.dishDao = dishDao;
    }

    public OrderItem getOrderItemById(Long orderItemId){
        return orderItemDao.selectOrderItemById(orderItemId).orElseThrow(
                () -> new OrderItemNotFoundException("Order Item with id [%s] is not found!".formatted(orderItemId))
        );
    }

    public List<OrderItemResponse> getOrderItemsByOrderId(Long orderId) {
        List<OrderItem> orderItems = orderItemDao.selectOrderItemsByOrderId(orderId);
        List<OrderItemResponse> responseList = new ArrayList<>();

        for (OrderItem orderItem : orderItems) {
            Long dishId = orderItem.getDishId();
            Dish dish = dishDao.selectDishById(dishId).orElseThrow(() -> new DishNotFoundException("Dish with id [%s] is not found!".formatted(dishId)));

            OrderItemResponse response = new OrderItemResponse(
                    dishId,
                    dish.getName(),
                    orderItem.getQuantity(),
                    orderItem.getPrice()
            );

            responseList.add(response);
        }

        return responseList;
    }

    public void updateOrderItem(Long orderItemId, OrderItemRequest orderItemRequest){
        OrderItem curOrderItem = getOrderItemById(orderItemId);

        boolean isChange = false;
        boolean isAmountChanged = false;
        Integer curQuantity = curOrderItem.getQuantity();
        Double curPrice = curOrderItem.getPrice();
        Double curTotalSinglePrice = curQuantity * curPrice;

        if (curOrderItem.getOrderItemId() != null && !curOrderItem.getOrderId().equals(orderItemRequest.orderId())){
            curOrderItem.setOrderItemId(orderItemRequest.orderId());
            isChange = true;
        }

        if (curOrderItem.getDishId() != null && !curOrderItem.getDishId().equals(orderItemRequest.dishId())){
            curOrderItem.setDishId(orderItemRequest.dishId());
            isChange = true;
        }

        if (curOrderItem.getQuantity() != null && !curOrderItem.getQuantity().equals(orderItemRequest.quantity())){
            curOrderItem.setQuantity(orderItemRequest.quantity());
            isChange = true;
            isAmountChanged = true;
        }

        if (curOrderItem.getPrice() != null && !curOrderItem.getPrice().equals(orderItemRequest.price())){
            curOrderItem.setPrice(orderItemRequest.price());
            isChange = true;
            isAmountChanged = true;
        }

        if (isChange) {
            orderItemDao.updateOrderItem(curOrderItem);
        } else {
            throw new RequestValidationException("No Data Changed!");
        }

        if (isAmountChanged) {
            Orders curOrder = orderDao.selectOrderById(curOrderItem.getOrderId()).orElseThrow(
                    () -> new OrderNotFoundException("Cannot find order with id [%s]".formatted(curOrderItem.getOrderId()))
            );

            Integer newQuantity = curOrderItem.getQuantity();
            Double newPrice = curOrderItem.getPrice();
            Double newTotalSinglePrice = newQuantity * newPrice;

            curOrder.setTotalPrice(curOrder.getTotalPrice() - curTotalSinglePrice + newTotalSinglePrice);
        }
    }



}
