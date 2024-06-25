package com.epiceats.epiceats.dao.orderItem;

import com.epiceats.epiceats.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
