package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.order.OrderDao;
import com.epiceats.epiceats.dao.orderItem.OrderItemDao;
import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;
import com.epiceats.epiceats.dto.order.OrderRequest;
import com.epiceats.epiceats.entity.Order;
import com.epiceats.epiceats.entity.OrderItem;
import com.epiceats.epiceats.exception.OrderNotFoundException;
import com.epiceats.epiceats.exception.RequestValidationException;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
public class OrderService {

    private final OrderDao orderDao;

    private final OrderItemDao orderItemDao;

    public OrderService(OrderDao orderDao, OrderItemDao orderItemDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
    }

    public void addOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setTotalPrice(orderRequest.totalPrice());
        order.setStatus("in progress");
        order.setOrderDate(ZonedDateTime.now());

        try {
            Order savedOrder = orderDao.insertOrder(order);
            for (OrderItemRequest orderItemRequest : orderRequest.orderItems()){
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderId(savedOrder.getOrderId());
                orderItem.setDishId(orderItemRequest.dishId());
                orderItem.setQuantity(orderItemRequest.quantity());
                orderItem.setPrice(orderItemRequest.price());
                orderItemDao.insertOrderItem(orderItem);
            }
        } catch (Exception e) {
            throw new RequestValidationException("There is something conflict about the order");
        }
    }

    public Order getOrderById(Long orderId){
        return orderDao.selectOrderById(orderId).orElseThrow(
                () -> new OrderNotFoundException("Order with id [%s] is not found!".formatted(orderId))
        );
    }

    public void updateOrderStatus(Long orderId, String msg){
        Order curOrder = getOrderById(orderId);

        if (curOrder.getStatus() != null && !curOrder.getStatus().equals(msg)){
            curOrder.setStatus(msg);
        }

        orderDao.updateOrder(curOrder);
    }

    public void deleteOrderStatus(Long orderId){
        updateOrderStatus(orderId, "archived");
    }
}
