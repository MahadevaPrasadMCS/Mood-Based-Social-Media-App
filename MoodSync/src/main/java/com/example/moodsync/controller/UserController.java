package com.example.moodsync.controller;

import com.example.moodsync.dto.LoginRequest;
import com.example.moodsync.dto.RegisterRequest;
import org.springframework.web.bind.annotation.*;
import com.example.moodsync.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/register")
  public String register(@RequestBody RegisterRequest request) {
    return userService.register(request);
  }

  @PostMapping("/login")
  public String login(@RequestBody LoginRequest request) {
    return userService.login(request);
  }
}
