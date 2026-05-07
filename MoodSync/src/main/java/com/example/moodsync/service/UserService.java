package com.example.moodsync.service;

import com.example.moodsync.dto.LoginRequest;
import com.example.moodsync.dto.RegisterRequest;
import com.example.moodsync.entity.UserEntity;
import org.springframework.stereotype.Service;
import com.example.moodsync.repository.UserRepository;

@Service
public class UserService {

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  // REGISTER
  public String register(RegisterRequest request) {

    // Check existing email
    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
      return "Email already exists";
    }

    UserEntity user = new UserEntity();

    user.setUserName(request.getUserName());
    user.setEmail(request.getEmail());

    // Store password directly
    user.setPassword(request.getPassword());

    userRepository.save(user);

    return "User registered successfully";
  }

  // LOGIN
  public String login(LoginRequest request) {

    UserEntity user = userRepository
      .findByEmail(request.getEmail())
      .orElse(null);

    if (user == null) {
      return "User not found";
    }

    // Compare plain text passwords
    if (!user.getPassword().equals(request.getPassword())) {
      return "Invalid password";
    }

    return "Login successful";
  }
}
