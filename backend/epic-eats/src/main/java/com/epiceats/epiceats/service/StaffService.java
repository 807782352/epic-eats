package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.StaffDao;
import com.epiceats.epiceats.dto.StaffRequest;
import com.epiceats.epiceats.entity.Staff;
import com.epiceats.epiceats.exception.DuplicateResourceException;
import com.epiceats.epiceats.exception.RequestValidationException;
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
        newStaff.setActivate(true);
        newStaff.setCreateTime(ZonedDateTime.now());
        newStaff.setUpdateTime(ZonedDateTime.now());
        staffDao.insertStaff(newStaff);
    }

    public void updateStaff(Long id, StaffRequest staffRequest){
        Staff curStaff = getStaffById(id);

        if (curStaff == null) {
            throw new StaffNotFoundException("Staff with id %s does not exist!".formatted(id));
        }

        boolean isChange = false;

        if (staffRequest.firstName() != null && !staffRequest.firstName().equals(curStaff.getFirstName())){
            isChange = true;
            curStaff.setFirstName(staffRequest.firstName());
        }
        if (staffRequest.lastName() != null && !staffRequest.lastName().equals(curStaff.getLastName())){
            isChange = true;
            curStaff.setLastName(staffRequest.lastName());
        }

        if (staffRequest.email() != null && !staffRequest.email().equals(curStaff.getEmail())){
            isChange = true;
            curStaff.setEmail(staffRequest.email());
        }
        if (staffRequest.phone() != null && !staffRequest.phone().equals(curStaff.getPhone())){
            isChange = true;
            curStaff.setPhone(staffRequest.phone());
        }
        if (staffRequest.role() != null && !staffRequest.role().equals(curStaff.getRole())){
            isChange = true;
            curStaff.setRole(staffRequest.role());
        }
        if (staffRequest.activate() != null && !staffRequest.activate().equals(curStaff.getActivate())){
            isChange = true;
            curStaff.setActivate(staffRequest.activate());
        }

        if (!isChange) {
            throw new RequestValidationException("No data changes found");
        }
        curStaff.setUpdateTime(ZonedDateTime.now());

        staffDao.updateStaff(curStaff);
    }

    public void switchStaffActivity(Long id) {
        Staff curStaff = getStaffById(id);

        if (curStaff == null) {
            throw new StaffNotFoundException("Staff with id %s does not exist!".formatted(id));
        }

        curStaff.setActivate(!curStaff.getActivate());
        staffDao.updateStaff(curStaff);
    }
}
