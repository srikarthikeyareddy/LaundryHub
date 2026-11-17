package com.hostel.laundry.service;

import com.hostel.laundry.dto.StudentResponse;
import com.hostel.laundry.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Locale;
import java.util.Optional;

/** Credential check for the personal demonstration account, not API authorization. */
@Service
public class StudentLoginService {
    private final StudentRepository students;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    private final String demoPasswordHash;

    public StudentLoginService(StudentRepository students,
            @Value("${laundry.demo.student-password:WashWise@123}") String demoPassword) {
        this.students = students;
        this.demoPasswordHash = encoder.encode(demoPassword);
    }

    public Optional<StudentResponse> login(String registrationNumber, String password) {
        String registration = registrationNumber.trim().toUpperCase(Locale.ROOT);
        boolean validPassword = encoder.matches(password, demoPasswordHash);
        if (!"RA2311003011798".equals(registration) || !validPassword) return Optional.empty();
        return students.findByStudentId(registration).map(StudentResponse::new);
    }
}
