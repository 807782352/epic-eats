package com.epiceats.epiceats.dao.order;

import com.epiceats.epiceats.entity.Orders;
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
    public List<Orders> selectAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Orders> selectOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public boolean existsOrderById(Long id) {
        return orderRepository.existsById(id);
    }

    @Override
    public Orders insertOrder(Orders order) {
        return orderRepository.save(order);
    }

    @Override
    public void updateOrder(Orders order) {
        orderRepository.save(order);
    }
}
