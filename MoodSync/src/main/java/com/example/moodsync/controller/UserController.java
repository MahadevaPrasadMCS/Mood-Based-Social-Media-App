package com.example.moodsync.controller;

import com.example.moodsync.dto.LoginRequest;
import com.example.moodsync.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;
import com.example.moodsync.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
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
}
