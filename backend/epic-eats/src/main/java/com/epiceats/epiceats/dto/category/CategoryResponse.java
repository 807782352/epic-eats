package com.epiceats.epiceats.dto.category;

public record CategoryResponse (
        Long id,
        String name,
        Integer type,
        String createTime,
        String updateTime
){
}
