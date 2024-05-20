package com.epiceats.epiceats.dao;

import com.epiceats.epiceats.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, Long> {

    boolean existsStaffByEmail(String email);

}