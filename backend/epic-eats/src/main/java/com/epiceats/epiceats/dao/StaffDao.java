package com.epiceats.epiceats.dao;

import com.epiceats.epiceats.entity.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffDao {

    List<Staff> selectAllStaffs();

    Optional<Staff> selectStaffById(Long id);

    Staff insertStaff(Staff staff);

    boolean existsStaffWithEmail(String email);

}