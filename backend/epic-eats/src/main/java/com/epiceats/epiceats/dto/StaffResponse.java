package com.epiceats.epiceats.dto;

public record StaffResponse (
        Long id,
        String firstName,
        String lastName,
        String phone,
        String email,
        Boolean activate,
        String createTime,
        String updateTime,
        String role
        ){
}
