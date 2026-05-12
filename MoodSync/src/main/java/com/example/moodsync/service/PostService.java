package com.example.moodsync.service;

import com.example.moodsync.dto.CreatePostRequest;
import com.example.moodsync.entity.PostEntity;
import com.example.moodsync.entity.UserEntity;
import com.example.moodsync.repository.PostRepository;
import com.example.moodsync.entity.PostLikeEntity;
import com.example.moodsync.repository.PostLikeRepository;
import com.example.moodsync.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private final PostLikeRepository postLikeRepository;

  public PostService(
    PostRepository postRepository,
    UserRepository userRepository,
    PostLikeRepository postLikeRepository
  ) {

    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.postLikeRepository = postLikeRepository;
  }

  // CREATE POST

  public Map<String, Object> createPost(
    CreatePostRequest request
  ) {

    UserEntity user =
      userRepository
        .findById(request.getUserId())
        .orElseThrow();

    PostEntity post =
      new PostEntity();

    post.setCaption(
      request.getCaption()
    );

    post.setMood(
      request.getMood()
    );

    post.setIntent(
      request.getIntent()
    );

    post.setImageUrl(
      request.getImageUrl()
    );

    post.setImageUrl(
      request.getImageUrl()
    );

    post.setCreatedAt(
      LocalDateTime.now()
    );

    post.setUser(user);

    postRepository.save(post);

    return Map.of(
      "success", true,
      "message", "Post created"
    );
  }

  // USER POSTS

  public List<PostEntity> getUserPosts(
    Long userId
  ) {

    return postRepository
      .findByUserId(userId);
  }

  public List<PostEntity> getFeedPosts(

    Long userId,

    String mood,

    String intent

  ) {

    return postRepository

      .findByUserIdNotAndMoodAndIntent(

        userId,

        mood,

        intent
      );
  }
  public Map<String, Object>

  toggleLike(

    Long postId,

    Long userId

  ) {

    PostEntity post =

      postRepository

        .findById(postId)

        .orElseThrow();

    UserEntity user =

      userRepository

        .findById(userId)

        .orElseThrow();

    Optional<PostLikeEntity>
      existingLike =

      postLikeRepository

        .findByPostAndUser(
          post,
          user
        );

    boolean liked;

    /* ---------------- UNLIKE ---------------- */

    if (
      existingLike.isPresent()
    ) {

      postLikeRepository.delete(

        existingLike.get()
      );

      post.setLikes(

        post.getLikes() - 1
      );

      liked = false;
    }

    /* ---------------- LIKE ---------------- */

    else {

      PostLikeEntity like =
        new PostLikeEntity();

      like.setPost(post);

      like.setUser(user);

      like.setCreatedAt(
        LocalDateTime.now()
      );

      postLikeRepository.save(
        like
      );

      post.setLikes(

        post.getLikes() + 1
      );

      liked = true;
    }

    postRepository.save(post);

    return Map.of(

      "success", true,

      "liked", liked,

      "likes", post.getLikes()
    );
  }
}
