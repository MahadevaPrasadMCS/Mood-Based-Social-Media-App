package com.example.moodsync.service;

import com.example.moodsync.dto.LoginRequest;
import com.example.moodsync.dto.RegisterRequest;
import com.example.moodsync.entity.UserEntity;
import org.springframework.stereotype.Service;
import com.example.moodsync.repository.UserRepository;

import java.util.Map;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // REGISTER
  public Map<String, Object> register(RegisterRequest request) {

    // Check existing email
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {

      return Map.of(
        "success", false,
        "message", "Email already exists"
      );
    }

    UserEntity user = new UserEntity();

    user.setUserName(request.getUserName());
    user.setEmail(request.getEmail());

    // Store password directly
    user.setPassword(request.getPassword());

    userRepository.save(user);

    return Map.of(
      "success", true,
      "message", "User registered successfully",
      "user", Map.of(
        "id", user.getId(),
        "username", user.getUserName(),
        "email", user.getEmail()
      )
    );
  }

  // LOGIN
  public Map<String, Object> login(LoginRequest request) {

    UserEntity user = userRepository
      .findByEmail(request.getEmail())
      .orElse(null);

    if (user == null) {

      return Map.of(
        "success", false,
        "message", "User not found"
      );
    }

    if (!user.getPassword().equals(request.getPassword())) {

      return Map.of(
        "success", false,
        "message", "Invalid Email or password"
      );
    }

    return Map.of(
      "success", true,
      "message", "Login successful",
      "user", Map.of(
        "id", user.getId(),
        "username", user.getUserName(),
        "email", user.getEmail()
      )
    );
  }
}
