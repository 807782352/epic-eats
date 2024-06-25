package com.epiceats.epiceats.dao.order;

import com.epiceats.epiceats.entity.Order;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderDaoImpl implements OrderDao{

    private final OrderRepository orderRepository;

    public OrderDaoImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<Order> selectAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> selectOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public boolean existsOrderById(Long id) {
        return orderRepository.existsById(id);
    }

    @Override
    public Order insertOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void updateOrder(Order order) {
        orderRepository.save(order);
    }
}
