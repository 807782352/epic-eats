package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.category.CategoryRequest;
import com.epiceats.epiceats.entity.Category;
import com.epiceats.epiceats.service.CategoryService;
import com.epiceats.epiceats.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping()
    public Result<List<Category>> getCategories(){
        List<Category> data = categoryService.getAllCategories();
        return Result.success(data);
    }

    @GetMapping("/{categoryId}")
    public Result<Category> getCategoryById(@PathVariable("categoryId") Long categoryId){
        try {
            Category category = categoryService.getCategoryById(categoryId);
            return Result.success(category);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping()
    public Result<String> addCategory(@RequestBody CategoryRequest categoryRequest) {
        try {
            categoryService.addCategory(categoryRequest);
            return Result.success("Add Category Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{categoryId}")
    public Result<String> updateCategory(@PathVariable("categoryId") Long categoryId, @RequestBody CategoryRequest categoryRequest){
        try {
            categoryService.updateCategory(categoryId, categoryRequest);
            return Result.success("Update Category Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PatchMapping("/swap/{categoryId1}/{categoryId2}")
    public Result<String> swapCategorySort(@PathVariable("categoryId1") Long categoryId1, @PathVariable("categoryId2") Long categoryId2){
        try {
            categoryService.swapCategorySort(categoryId1, categoryId2);
            return Result.success("Swap Category Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @DeleteMapping("/{categoryId}")
    public Result<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
            return Result.success("Delete Category Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

}
