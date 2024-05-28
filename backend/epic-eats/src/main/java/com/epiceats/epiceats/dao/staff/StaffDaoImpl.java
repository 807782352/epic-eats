package com.epiceats.epiceats.dao.staff;

import com.epiceats.epiceats.entity.Staff;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class StaffDaoImpl implements StaffDao {

    private final StaffRepository staffRepository;

    public StaffDaoImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }


    @Override
    public List<Staff> selectAllStaffs() {
        return staffRepository.findAll();
    }

    @Override
    public Optional<Staff> selectStaffById(Long id) {
        return staffRepository.findById(id);
    }

    @Override
    public void insertStaff(Staff staff) {
        staffRepository.save(staff);
    }

    @Override
    public boolean existsStaffWithEmail(String email) {
        return staffRepository.existsStaffByEmail(email);
    }

    @Override
    public void updateStaff(Staff staff) {
        staffRepository.save(staff);
    }
}
