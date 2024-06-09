package com.epiceats.epiceats.dto.dish;

public record DishResponse (
        Long id,
        String name,
        String categoryName,
        String code,
        String image,
        String description,
        Double price,
        Integer status,
        Integer isDeleted,
        String createTime,
        String updateTime
){
}
