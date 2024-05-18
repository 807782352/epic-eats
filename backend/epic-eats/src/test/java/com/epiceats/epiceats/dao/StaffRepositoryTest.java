package com.epiceats.epiceats.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class StaffRepositoryTest {

    @Autowired
    private StaffRepository testStaffRepository;

    @BeforeEach
    void setUp() {
    }

    @Test
    void existsStaffByEmail() {
    }
}