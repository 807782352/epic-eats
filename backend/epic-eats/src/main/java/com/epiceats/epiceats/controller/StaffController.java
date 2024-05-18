package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.StaffRequest;
import com.epiceats.epiceats.entity.Staff;
import com.epiceats.epiceats.service.StaffService;
import com.epiceats.epiceats.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("api/v1/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @GetMapping()
    public Result<List<Staff>> getStaffs() {
        List<Staff> data = staffService.getAllStaffs();
        return Result.success(data);
    }

    @GetMapping("/{staffId}")
    public Result<Staff> getStaffyId(@PathVariable("staffId") Long memberId) {
        try {
            Staff staff = staffService.getStaffById(memberId);
            return Result.success(staff);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping()
    public Result<Integer> addStaff(@RequestBody StaffRequest staffRequest){
        try {
            staffService.addStaff(staffRequest);
            return Result.success(1);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

}
