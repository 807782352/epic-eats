package com.epiceats.epiceats.dto.dish;

public record DishRequest(
    String name,
    Long categoryId,
    Double price,
    String image,
    String description,
    String code
) {
}
