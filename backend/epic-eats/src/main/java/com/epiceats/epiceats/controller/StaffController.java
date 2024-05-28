package com.epiceats.epiceats.controller;

import com.epiceats.epiceats.dto.staff.StaffRequest;
import com.epiceats.epiceats.dto.staff.StaffResponse;
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
    public Result<List<StaffResponse>> getStaffs() {
        List<StaffResponse> data = staffService.getAllStaffResponses();
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
    public Result<String> addStaff(@RequestBody StaffRequest staffRequest){
        try {
            staffService.addStaff(staffRequest);
            return Result.success("Add Staff Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{staffId}")
    public Result<String> updateStaff(@PathVariable("staffId") Long staffId,
                                      @RequestBody StaffRequest staffRequest) {
        try {
            staffService.updateStaff(staffId, staffRequest);
            return Result.success("Update Staff Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    @PatchMapping("/{staffId}")
    public Result<String> switchStaffActivate(@PathVariable("staffId") Long staffId) {
        try {
            staffService.switchStaffActivity(staffId);
            return Result.success("Switch Staff's Activity Successfully!");
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
