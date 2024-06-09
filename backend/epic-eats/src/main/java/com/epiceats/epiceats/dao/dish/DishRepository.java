package com.epiceats.epiceats.dao.dish;

import com.epiceats.epiceats.entity.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface DishRepository extends JpaRepository<Dish, Long> {

    boolean existsDishByName(String name);

    List<Dish> findAllByCategoryId(Long categoryId);
}
