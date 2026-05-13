package com.example.moodsync.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moodsync.dto.requests.LoginRequest;
import com.example.moodsync.dto.requests.RegisterRequest;
import com.example.moodsync.dto.requests.UpdateProfileRequest;
import com.example.moodsync.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://moodsync-omega.vercel.app")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public Map<String, Object> register(@RequestBody RegisterRequest request) {
    return userService.register(request);
  }

  @PostMapping("/login")
  public Map<String, Object> login(@RequestBody LoginRequest request) {
    return userService.login(request);
  }

  @PutMapping("/profile/{userId}")
  public Map<String, Object>
  updateProfile(
    @PathVariable Long userId,
    @RequestBody
    UpdateProfileRequest request
  ) {
    return userService
      .updateProfile(
        userId,
        request
      );
  }
}
