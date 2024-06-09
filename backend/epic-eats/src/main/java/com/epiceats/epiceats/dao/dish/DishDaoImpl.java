package com.epiceats.epiceats.dao.dish;

import com.epiceats.epiceats.entity.Dish;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class DishDaoImpl implements DishDao{
    private final DishRepository dishRepository;

    public DishDaoImpl(DishRepository dishRepository) {
        this.dishRepository = dishRepository;
    }


    @Override
    public List<Dish> selectAllDishes() {
        return dishRepository.findAll();
    }

    @Override
    public Optional<Dish> selectDishById(Long id) {
        return dishRepository.findById(id);
    }

    @Override
    public List<Dish> selectAllDishesByCategory(Long categoryId) {
        return dishRepository.findAllByCategoryId(categoryId);
    }

    @Override
    public boolean existsDishByName(String name) {
        return dishRepository.existsDishByName(name);
    }

    @Override
    public void insertDish(Dish dish) {
        dishRepository.save(dish);
    }

    @Override
    public void updateDish(Dish dish) {
        dishRepository.save(dish);
    }

    @Override
    public void deleteDish(Long id) {
        dishRepository.deleteById(id);
    }
}
