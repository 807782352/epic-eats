package com.epiceats.epiceats.dao.order;

import com.epiceats.epiceats.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
