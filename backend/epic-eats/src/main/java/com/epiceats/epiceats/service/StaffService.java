package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.StaffDao;
import com.epiceats.epiceats.dto.StaffRequest;
import com.epiceats.epiceats.entity.Staff;
import com.epiceats.epiceats.exception.DuplicateResourceException;
import com.epiceats.epiceats.exception.StaffNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class StaffService {

    private final StaffDao staffDao;


    public StaffService(@Qualifier("jpa") StaffDao staffDao) {
        this.staffDao = staffDao;
    }

    public List<Staff> getAllStaffs(){
        return staffDao.selectAllStaffs();
    }

    public Staff getStaffById(Long id){
        return staffDao.selectStaffById(id).orElseThrow(
                () -> new StaffNotFoundException("Member with id [%s] is not found".formatted(id))
        );
    }

    public void addStaff(StaffRequest staffRequest) {
        // check if email exists
        String email = staffRequest.email();
        if (staffDao.existsStaffWithEmail(email)){
            throw new DuplicateResourceException("Email " + email + " has taken");
        }

        // add
        Staff newStaff = new Staff();
        BeanUtils.copyProperties(staffRequest, newStaff);
        newStaff.setActivate(1);
        newStaff.setCreateTime(ZonedDateTime.now());
        newStaff.setUpdateTime(ZonedDateTime.now());
        System.out.println(newStaff);
        staffDao.insertStaff(newStaff);
    }
}
