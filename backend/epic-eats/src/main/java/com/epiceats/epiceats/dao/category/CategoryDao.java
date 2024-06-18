package com.epiceats.epiceats.dao.category;

import com.epiceats.epiceats.entity.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryDao {
    List<Category> selectAllCategories();

    Optional<Category> selectCategoryById(Long id);

    boolean existsCategoryByName(String name);

    void insertCategory(Category category);

    void updateCategory(Category category);

    void deleteCategoryById(Long id);

    Long findMaxSort();


}
