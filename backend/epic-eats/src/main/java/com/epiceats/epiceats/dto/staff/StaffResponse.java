package com.epiceats.epiceats.dto.staff;

import com.epiceats.epiceats.entity.Role;

public record StaffResponse (
        Long id,
        String firstName,
        String lastName,
        String phone,
        String email,
        Boolean activate,
        String createTime,
        String updateTime,
        Role role
        ){
}
