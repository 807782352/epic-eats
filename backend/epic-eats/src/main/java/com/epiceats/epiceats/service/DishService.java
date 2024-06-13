package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.category.CategoryDao;
import com.epiceats.epiceats.dao.dish.DishDao;
import com.epiceats.epiceats.dto.dish.DishRequest;
import com.epiceats.epiceats.dto.dish.DishResponse;
import com.epiceats.epiceats.entity.Category;
import com.epiceats.epiceats.entity.Dish;
import com.epiceats.epiceats.exception.CategoryNotFoundException;
import com.epiceats.epiceats.exception.DishNotFoundException;
import com.epiceats.epiceats.exception.DuplicateResourceException;
import com.epiceats.epiceats.exception.RequestValidationException;
import com.epiceats.epiceats.utils.DateTimeUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DishService {

    private final DishDao dishDao;

    private final CategoryDao categoryDao;

    public DishService(DishDao dishDao, CategoryDao categoryDao) {
        this.dishDao = dishDao;
        this.categoryDao = categoryDao;
    }

    public List<DishResponse> getAllDishes(){
        return dishDao.selectAllDishes().stream().map(this::mapToDishResponse).collect(Collectors.toList());
    }

    public List<DishResponse> getAllDishesByCategoryId(Long categoryId){
        return dishDao.selectAllDishesByCategory(categoryId).stream().map(this::mapToDishResponse).collect(Collectors.toList());
    }

    public Dish getDishById(Long id) {
        return dishDao.selectDishById(id).orElseThrow(
                ()-> new DishNotFoundException("Dish with id [%s] is not found!".formatted(id))
        );
    }

    public void addDish(DishRequest dishRequest){
        if (dishDao.existsDishByName(dishRequest.name())) {
            throw new DuplicateResourceException("Dish with name [%s] is existed".formatted(dishRequest.name()));
        }

        Dish newDish = new Dish();
        BeanUtils.copyProperties(dishRequest, newDish);
        newDish.setCreateTime(ZonedDateTime.now());
        newDish.setUpdateTime(ZonedDateTime.now());

        newDish.setStatus(1);
        newDish.setIsDeleted(0);

        dishDao.insertDish(newDish);
    }

    public void updateDish(Long id, DishRequest dishRequest){
        Dish curDish = getDishById(id);

        if (curDish == null) {
            throw new DishNotFoundException("Dish with [%s] is not found!".formatted(id));
        }

        boolean isChange = false;

        if (dishRequest.name() != null && !dishRequest.name().equals(curDish.getName())){
            if (dishDao.existsDishByName(dishRequest.name())){
                throw new DuplicateResourceException(
                        "Dish with name [%s] has already been used!".formatted(dishRequest.name())
                );
            }
            curDish.setName(dishRequest.name());
            isChange = true;
        }

        if (dishRequest.categoryId() != null && !dishRequest.categoryId().equals(curDish.getCategoryId())){
            curDish.setCategoryId(dishRequest.categoryId());
            isChange = true;
        }

        if (dishRequest.price() != null && !dishRequest.price().equals(curDish.getPrice())){
            curDish.setPrice(dishRequest.price());
            isChange = true;
        } else if (dishRequest.price() == null && curDish.getPrice() != null){
            isChange = true;
        }

        if (dishRequest.image() != null && !dishRequest.image().equals(curDish.getImage())){
            curDish.setImage(dishRequest.image());
            isChange = true;
        } else if (dishRequest.image() == null && curDish.getImage() != null){
            isChange = true;
        }

        if (!dishRequest.description().equals(curDish.getDescription())){
            curDish.setDescription(dishRequest.description());
            isChange = true;
        }

        if (dishRequest.code() != null && !dishRequest.code().equals(curDish.getCode())){
            curDish.setCode(dishRequest.code());
            isChange = true;
        }

        if (!isChange) {
            throw new RequestValidationException("No data changing!");
        }

        curDish.setUpdateTime(ZonedDateTime.now());

        dishDao.updateDish(curDish);

    }

    public void changeIsDelete(Long id){
        Dish curDish = getDishById(id);

        if (curDish == null) {
            throw new DishNotFoundException("Dish with id [%s] is not found!".formatted(id));
        }

        curDish.setIsDeleted(curDish.getIsDeleted() == 1 ? 0 : 1);
        curDish.setStatus(0);
        curDish.setUpdateTime(ZonedDateTime.now());

        dishDao.updateDish(curDish);

    }

    public void changeStatus(Long id){
        Dish curDish = getDishById(id);

        if (curDish == null) {
            throw new DishNotFoundException("Dish with id [%s] is not found!".formatted(id));
        }

        curDish.setStatus(curDish.getStatus() == 1 ? 0 : 1);
        curDish.setUpdateTime(ZonedDateTime.now());

        dishDao.updateDish(curDish);

    }

    private DishResponse mapToDishResponse(Dish dish){
        Optional<Category> categoryName = Optional.ofNullable(categoryDao.selectCategoryById(dish.getCategoryId()).orElseThrow(
                () -> {
                    throw new CategoryNotFoundException("Category with id [%s] is not found".formatted(dish.getCategoryId()));
                }
        ));

        return new DishResponse(
                dish.getId(),
                dish.getName(),
                dish.getCategoryId(),
                categoryName.get().getName(),
                dish.getCode(),
                dish.getImage(),
                dish.getDescription(),
                dish.getPrice(),
                dish.getStatus(),
                dish.getIsDeleted(),
                dish.getCreateTime().format(DateTimeUtils.FORMATTER),
                dish.getUpdateTime().format(DateTimeUtils.FORMATTER)

        );
    }
}
