package com.epiceats.epiceats.service;

import com.epiceats.epiceats.dao.role.RoleRepository;
import com.epiceats.epiceats.dao.staff.StaffDao;
import com.epiceats.epiceats.dto.staff.StaffRequest;
import com.epiceats.epiceats.dto.staff.StaffResponse;
import com.epiceats.epiceats.entity.Role;
import com.epiceats.epiceats.entity.Staff;
import com.epiceats.epiceats.exception.DuplicateResourceException;
import com.epiceats.epiceats.exception.RequestValidationException;
import com.epiceats.epiceats.exception.StaffNotFoundException;
import com.epiceats.epiceats.utils.DateTimeUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StaffService {

    private final StaffDao staffDao;

    private final RoleRepository roleRepository;

    public StaffService(StaffDao staffDao, RoleRepository roleRepository) {
        this.staffDao = staffDao;
        this.roleRepository = roleRepository;
    }

    public List<StaffResponse> getAllStaffResponses(){

        return staffDao.selectAllStaffs().stream()
                .map(this::mapToStaffResponse)
                .collect(Collectors.toList());
    }

    public Staff getStaffById(Long id){
        return staffDao.selectStaffById(id).orElseThrow(
                () -> new StaffNotFoundException("Member with id [%s] is not found".formatted(id))
        );
    }

    public StaffResponse getStaffResponseById(Long id){
        Staff staff = getStaffById(id);
        return mapToStaffResponse(staff);
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
        System.out.println(newStaff);


        Role roleId = roleRepository.findById(staffRequest.roleId())
                .orElseThrow(() -> new StaffNotFoundException("Role with id " + staffRequest.roleId() + " not found"));
        System.out.println(roleId);
        newStaff.setRoleId(roleId);
        System.out.println(newStaff);
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
        if (staffRequest.roleId() != null && !staffRequest.roleId().equals(curStaff.getRoleId().getId())){
            isChange = true;
            Role roleId = roleRepository.findById(staffRequest.roleId())
                    .orElseThrow(() -> new StaffNotFoundException("Role with id " + staffRequest.roleId() + " not found"));
            curStaff.setRoleId(roleId);
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
        curStaff.setUpdateTime(ZonedDateTime.now());
        staffDao.updateStaff(curStaff);
    }

    private StaffResponse mapToStaffResponse(Staff staff) {
        return new StaffResponse(
                staff.getId(),
                staff.getFirstName(),
                staff.getLastName(),
                staff.getPhone(),
                staff.getEmail(),
                staff.getActivate(),
                staff.getCreateTime().format(DateTimeUtils.FORMATTER),
                staff.getUpdateTime().format(DateTimeUtils.FORMATTER),
                staff.getRoleId()
        );
    }
}
