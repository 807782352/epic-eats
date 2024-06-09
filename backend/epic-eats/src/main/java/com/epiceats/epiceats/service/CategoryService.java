package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.category.CategoryDao;
import com.epiceats.epiceats.dto.category.CategoryRequest;
import com.epiceats.epiceats.dto.category.CategoryResponse;
import com.epiceats.epiceats.entity.Category;
import com.epiceats.epiceats.exception.CategoryNotFoundException;
import com.epiceats.epiceats.exception.DuplicateResourceException;
import com.epiceats.epiceats.exception.RequestValidationException;
import com.epiceats.epiceats.utils.DateTimeUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryDao categoryDao;

    public CategoryService(CategoryDao categoryDao) {
        this.categoryDao = categoryDao;
    }

    public List<CategoryResponse> getAllCategories() {
        return categoryDao.selectAllCategories().stream().map(
        this::mapToCategoryResponse).collect(Collectors.toList());    // .collect(Collectors.toList()) is a more general way than .toList()
    }

    public Category getCategoryById(Long id) {
        return categoryDao.selectCategoryById(id).orElseThrow(
                () -> new CategoryNotFoundException("Category with id [%s] is not found".formatted(id))
        );
    }

    public void addCategory(CategoryRequest categoryRequest){
        if (categoryDao.existsCategoryByName(categoryRequest.name())) throw new DuplicateResourceException(
                "Category with name [%s] is existed".formatted(categoryRequest.name())
        );


        Category newCategory = new Category();
        BeanUtils.copyProperties(categoryRequest, newCategory);
        newCategory.setCreateTime(ZonedDateTime.now());
        newCategory.setUpdateTime(ZonedDateTime.now());

        Long sortMax = categoryDao.findMaxSort();
        if(sortMax == null) sortMax = 0L;
        newCategory.setSort(sortMax  + 1);
        categoryDao.insertCategory(newCategory);
    }

    public void updateCategory(Long id, CategoryRequest categoryRequest) {
        Category curCategory = getCategoryById(id);

        if (curCategory == null) {
            throw new CategoryNotFoundException("Category with [id] %s does not exist!".formatted(id));
        }

        // check if the attribute changes
        boolean isChange = false;

        // check if name needs to update, and if name is duplicated
        if (categoryRequest.name() != null && !categoryRequest.name().equals(curCategory.getName())) {
            if (categoryDao.existsCategoryByName(categoryRequest.name())) {
                throw new DuplicateResourceException(
                        "Category with name [%s] has already been used!".formatted(categoryRequest.name())
                );
            }
            curCategory.setName(categoryRequest.name());
            isChange = true;
        }

        // check if type needs to update
        if (categoryRequest.type() != null && !categoryRequest.type().equals(curCategory.getType())) {
            curCategory.setType(categoryRequest.type());
            isChange = true;
        }

        if (!isChange) {
            throw new RequestValidationException("No data changes found");
        }

        curCategory.setUpdateTime(ZonedDateTime.now());

        categoryDao.updateCategory(curCategory);
    }

    public void deleteCategory(Long id) {
        Category curCategory = getCategoryById(id);

        if (curCategory == null) {
            throw new CategoryNotFoundException("Category with id %s does not exist!".formatted(id));
        }

        curCategory.setIsDeleted(1);
        curCategory.setUpdateTime(ZonedDateTime.now());

        categoryDao.updateCategory(curCategory);
    }

    public void swapCategorySort(Long id1, Long id2) {
        Category category1 = getCategoryById(id1);
        if (category1 == null) {
            throw new CategoryNotFoundException("Category with id %s does not exist!".formatted(id1));
        }

        Category category2 = getCategoryById(id2);
        if (category2 == null) {
            throw new CategoryNotFoundException("Category with id %s does not exist!".formatted(id2));
        }

        Long sort1 = category1.getSort();
        Long sort2 = category2.getSort();

        category1.setSort(sort2);
        category2.setSort(sort1);

        categoryDao.updateCategory(category1);
        categoryDao.updateCategory(category2);

        System.out.println("Swapped sort values: " + category1.getSort() + " and " + category2.getSort());
    }

    private CategoryResponse mapToCategoryResponse(Category category){
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getType(),
                category.getCreateTime().format(DateTimeUtils.FORMATTER),
                category.getUpdateTime().format(DateTimeUtils.FORMATTER)
        );
    }

}
