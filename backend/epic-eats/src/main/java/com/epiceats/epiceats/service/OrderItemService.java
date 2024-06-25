package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.order.OrderDao;
import com.epiceats.epiceats.dao.orderItem.OrderItemDao;
import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;
import com.epiceats.epiceats.entity.Order;
import com.epiceats.epiceats.entity.OrderItem;
import com.epiceats.epiceats.exception.OrderItemNotFoundException;
import com.epiceats.epiceats.exception.OrderNotFoundException;
import com.epiceats.epiceats.exception.RequestValidationException;

public class OrderItemService {
    private final OrderDao orderDao;

    private final OrderItemDao orderItemDao;

    public OrderItemService(OrderDao orderDao, OrderItemDao orderItemDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
    }

    // has already written in order request
    // public void addOrderItem(){}

    public OrderItem getOrderItemById(Long orderItemId){
        return orderItemDao.selectOrderItemById(orderItemId).orElseThrow(
                () -> new OrderItemNotFoundException("Order Item with id [%s] is not found!".formatted(orderItemId))
        );
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
            Order curOrder = orderDao.selectOrderById(curOrderItem.getOrderId()).orElseThrow(
                    () -> new OrderNotFoundException("Cannot find order with id [%s]".formatted(curOrderItem.getOrderId()))
            );

            Integer newQuantity = curOrderItem.getQuantity();
            Double newPrice = curOrderItem.getPrice();
            Double newTotalSinglePrice = newQuantity * newPrice;

            curOrder.setTotalPrice(curOrder.getTotalPrice() - curTotalSinglePrice + newTotalSinglePrice);
        }
    }



}
