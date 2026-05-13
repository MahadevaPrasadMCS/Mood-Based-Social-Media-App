package com.example.moodsync.controller;

import com.example.moodsync.dto.requests.CreatePostRequest;
import com.example.moodsync.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin("*")
public class PostController {

  private final PostService postService;

  public PostController(
    PostService postService
  ) {

    this.postService = postService;
  }

  @PostMapping("/create")
  public ResponseEntity<?> createPost(
    @RequestBody
    CreatePostRequest request
  ) {

    return ResponseEntity.ok(
      postService.createPost(request)
    );
  }

  @GetMapping("/feed")

  public ResponseEntity<?> getFeedPosts(

    @RequestParam Long userId,

    @RequestParam String mood,

    @RequestParam String intent

  ) {

    return ResponseEntity.ok(

      postService.getFeedPosts(

        userId,

        mood,

        intent
      )
    );
  }

  @GetMapping("/user/{userId}")
  public ResponseEntity<?> getUserPosts(
    @PathVariable Long userId
  ) {

    return ResponseEntity.ok(
      postService.getUserPosts(userId)
    );
  }
  @PostMapping("/{postId}/like")

  public ResponseEntity<?> toggleLike(

    @PathVariable Long postId,

    @RequestParam Long userId

  ) {

    return ResponseEntity.ok(

      postService.toggleLike(

        postId,

        userId
      )
    );
  }
}
