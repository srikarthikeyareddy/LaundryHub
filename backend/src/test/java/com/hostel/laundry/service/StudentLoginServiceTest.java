package com.hostel.laundry.service;
import com.hostel.laundry.entity.Student;
import com.hostel.laundry.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.Optional;
class StudentLoginServiceTest {
    @Test void acceptsPersonalCredentialsAndNormalizesRegistration() {
        var repo = mock(StudentRepository.class);
        when(repo.findByStudentId("RA2311003011798")).thenReturn(Optional.of(
            new Student("RA2311003011798", "Sri Karthikeya", "Not provided", "Not set", "Not set")));
        var service = new StudentLoginService(repo, "WashWise@123");
        assertEquals("Sri Karthikeya", service.login(" ra2311003011798 ", "WashWise@123").orElseThrow().getName());
    }
    @Test void rejectsWrongPasswordAndUnknownRegistration() {
        var repo = mock(StudentRepository.class);
        var service = new StudentLoginService(repo, "WashWise@123");
        assertTrue(service.login("RA2311003011798", "wrong-password").isEmpty());
        assertTrue(service.login("RA0000000000000", "WashWise@123").isEmpty());
        verifyNoInteractions(repo);
    }
}
