package com.epiceats.epiceats.dto;

public record StaffRequest(
        String firstName,
        String lastName,
        String password,
        String email,
        String phone,
        Integer role,
        Boolean activate
) {
}
