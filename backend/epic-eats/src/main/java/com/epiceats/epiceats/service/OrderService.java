package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.order.OrderDao;
import com.epiceats.epiceats.dao.orderItem.OrderItemDao;
import com.epiceats.epiceats.dao.staff.StaffDao;
import com.epiceats.epiceats.dto.order.OrderResponse;
import com.epiceats.epiceats.dto.orderItem.OrderItemRequest;
import com.epiceats.epiceats.dto.order.OrderRequest;
import com.epiceats.epiceats.entity.Orders;
import com.epiceats.epiceats.entity.OrderItem;
import com.epiceats.epiceats.entity.Staff;
import com.epiceats.epiceats.exception.OrderNotFoundException;
import com.epiceats.epiceats.exception.RequestValidationException;
import com.epiceats.epiceats.exception.StaffNotFoundException;
import com.epiceats.epiceats.utils.DateTimeUtils;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private final OrderDao orderDao;

    private final OrderItemDao orderItemDao;

    private final StaffDao staffDao;

    public OrderService(OrderDao orderDao, OrderItemDao orderItemDao, StaffDao staffDao) {
        this.orderDao = orderDao;
        this.orderItemDao = orderItemDao;
        this.staffDao = staffDao;
    }

    public void addOrder(OrderRequest orderRequest) {
        Orders order = new Orders();
        order.setTotalPrice(orderRequest.totalPrice());
        order.setUserId(orderRequest.userId());
        order.setStatus("in progress");
        order.setOrderDate(ZonedDateTime.now());

        try {
            Orders savedOrder = orderDao.insertOrder(order);
            for (OrderItemRequest orderItemRequest : orderRequest.orderItems()){
                OrderItem orderItem = new OrderItem();
                orderItem.setOrderId(savedOrder.getOrderId());
                orderItem.setDishId(orderItemRequest.dishId());
                orderItem.setQuantity(orderItemRequest.quantity());
                orderItem.setPrice(orderItemRequest.price());
                orderItemDao.insertOrderItem(orderItem);
            }
        } catch (Exception e) {
            System.err.println(e);
            throw new RequestValidationException("There is something conflict about the order");
        }
    }

    public Orders getOrderById(Long orderId){
        return orderDao.selectOrderById(orderId).orElseThrow(
                () -> new OrderNotFoundException("Order with id [%s] is not found!".formatted(orderId))
        );
    }

    public List<OrderResponse> getOrderResponses() {
        List<Orders> allOrders = orderDao.selectAllOrders();

        return allOrders.stream().map(order -> {
            Long orderId = order.getOrderId();
            Long userId = order.getUserId();

            Staff curStaff = staffDao.selectStaffById(userId).orElseThrow(
                    () -> new StaffNotFoundException("Staff with id [%s] is not found!".formatted(userId))
            );

            List<OrderItem> orderItems = orderItemDao.selectOrderItemsByOrderId(orderId);

            return new OrderResponse(orderId, userId, curStaff.getFirstName() + " " + curStaff.getLastName(), curStaff.getEmail(),
                    curStaff.getPhone(), orderItems, order.getStatus(), order.getTotalPrice(), order.getOrderDate().format(DateTimeUtils.FORMATTER));
        }).collect(Collectors.toList());
    }

    public OrderResponse getOrderResponseById(Long orderId){
        Orders curOrder = getOrderById(orderId);
        Long userId = curOrder.getUserId();

        Staff curStaff = staffDao.selectStaffById(userId).orElseThrow(
                () -> new StaffNotFoundException("Staff with id [%s] is not found!".formatted(userId))
        );

        List<OrderItem> orderItems = orderItemDao.selectOrderItemsByOrderId(orderId);
        System.out.println(orderItems);


        return new OrderResponse(orderId, userId, curStaff.getFirstName() + " " + curStaff.getLastName(), curStaff.getEmail(),
                curStaff.getPhone(), orderItems, curOrder.getStatus(), curOrder.getTotalPrice(), curOrder.getOrderDate().format(DateTimeUtils.FORMATTER));
    }

    public void updateOrderStatus(Long orderId) {
        String msg = "";

        Orders curOrder = getOrderById(orderId);

        String curStatus = curOrder.getStatus();

        switch (curStatus) {
            case "in progress":
            case "archived":
                msg = "finished";
                break;
            case "finished":
                msg = "archived";
                break;
            default:
                msg = "error";
        }

        updateOrderStatus(curOrder, msg);
    }

    public void updateOrderStatus(Orders curOrder, String msg){

        if (curOrder.getStatus() != null && !curOrder.getStatus().equals(msg)){
            curOrder.setStatus(msg);
        }

        orderDao.updateOrder(curOrder);
    }

    public void deleteOrderStatus(Long orderId){
        Orders curOrder = getOrderById(orderId);
        updateOrderStatus(curOrder, "archived");
    }
}
