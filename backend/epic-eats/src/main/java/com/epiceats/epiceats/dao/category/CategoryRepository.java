package com.epiceats.epiceats.dao.category;

import com.epiceats.epiceats.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsCategoryByName(String name);

    @Query("SELECT MAX(c.sort) FROM Category c")
    Long findMaxSort();


}
