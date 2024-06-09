package com.epiceats.epiceats.dao.dish;

import com.epiceats.epiceats.entity.Dish;

import java.util.List;
import java.util.Optional;

public interface DishDao {
    List<Dish> selectAllDishes();

    List<Dish> selectAllDishesByCategory(Long categoryId);

    Optional<Dish> selectDishById(Long id);

    boolean existsDishByName(String name);

    void insertDish(Dish dish);

    void updateDish(Dish dish);

    void deleteDish(Long id);


}
