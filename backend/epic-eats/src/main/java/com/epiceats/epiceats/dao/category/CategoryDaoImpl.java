package com.epiceats.epiceats.dao.category;

import com.epiceats.epiceats.entity.Category;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CategoryDaoImpl implements CategoryDao {

    private final CategoryRepository categoryRepository;

    public CategoryDaoImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public List<Category> selectAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public boolean existsCategoryByName(String name) {
        return categoryRepository.existsCategoryByName(name);
    }

    @Override
    public Optional<Category> selectCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void insertCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void updateCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Long findMaxSort() {
        return categoryRepository.findMaxSort();
    }
}
