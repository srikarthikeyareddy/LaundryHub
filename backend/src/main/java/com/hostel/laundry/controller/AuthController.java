package com.hostel.laundry.controller;

import com.hostel.laundry.dto.StudentResponse;
import com.hostel.laundry.entity.Staff;
import com.hostel.laundry.repository.StaffRepository;
import com.hostel.laundry.service.StudentService;
import com.hostel.laundry.service.StudentLoginService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final StudentService studentService;
    private final StudentLoginService studentLoginService;
    private final StaffRepository staffRepository;

    public AuthController(StudentService studentService, StaffRepository staffRepository, StudentLoginService studentLoginService) {
        this.studentService = studentService;
        this.studentLoginService = studentLoginService;
        this.staffRepository = staffRepository;
    }

    public record StudentLoginRequest(@NotBlank @Size(max=40) String registrationNumber,
                                      @NotBlank @Size(max=72) String password) {}

    @PostMapping("/student-login")
    public ResponseEntity<?> loginStudent(@Valid @RequestBody StudentLoginRequest request) {
        var student = studentLoginService.login(request.registrationNumber(), request.password());
        if (student.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("message", "Incorrect registration number or password."));
        }
        return ResponseEntity.ok(student.get());
    }

    @GetMapping("/users")
    public ResponseEntity<Map<String, Object>> getDemoUsers() {
        List<StudentResponse> students = studentService.getAllStudents(null);
        List<Staff> staffList = staffRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("students", students);
        response.put("staff", staffList);

        return ResponseEntity.ok(response);
    }
}
