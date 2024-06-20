package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.dish.DishRequest;
import com.epiceats.epiceats.dto.dish.DishResponse;
import com.epiceats.epiceats.entity.Dish;
import com.epiceats.epiceats.service.DishService;
import com.epiceats.epiceats.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/dish")
public class DishController {

    private final DishService dishService;

    public DishController(DishService dishService) {
        this.dishService = dishService;
    }

    @GetMapping()
    public Result<List<DishResponse>> getDishes(){
        try {
            List<DishResponse> dishes = dishService.getAllDishes();
            return Result.success(dishes);
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/{dishId}")
    public Result<Dish> getDishById(@PathVariable("dishId") Long dishId){
        try {
            Dish dish = dishService.getDishById(dishId);
            return Result.success(dish);
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/categoryId/{categoryId}")
    public Result<List<DishResponse>> getDishesByCategoryId(@PathVariable("categoryId") Long categoryId){
        try {
            List<DishResponse> dishes = dishService.getAllDishesByCategoryId(categoryId);
            return Result.success(dishes);
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PostMapping()
    public Result<String> addDish(@RequestBody DishRequest dishRequest){
        try {
            dishService.addDish(dishRequest);
            return Result.success("Add Dish Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{dishId}")
    public Result<String> updateDish(@PathVariable("dishId") Long dishId, @RequestBody DishRequest dishRequest){
        try {
            dishService.updateDish(dishId, dishRequest);
            return Result.success("Update Dish Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PatchMapping("/{dishId}")
    public Result<String> changeStatus(@PathVariable("dishId") Long dishId){
        try {
            dishService.changeStatus(dishId);
            return Result.success("Swap Dish Status Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @PatchMapping("/purchase/{dishId}")
    public Result<String> addDishPurchaseAmount(@PathVariable("dishId") Long dishId){
        try {
            dishService.addDishPurchaseAmount(dishId);
            return Result.success("Add Dish Purchase Amount Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/{dishId}")
    public Result<String> deleteDish(@PathVariable("dishId") Long dishId){
        try {
            dishService.changeIsDelete(dishId);
            return Result.success("Change Dish isDelete Status Successfully!");
        } catch (Exception e){
            return Result.error(e.getMessage());
        }
    }
}
