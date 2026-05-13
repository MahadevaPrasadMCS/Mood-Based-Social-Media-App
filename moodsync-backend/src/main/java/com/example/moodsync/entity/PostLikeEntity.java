package com.example.moodsync.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_likes")

public class PostLikeEntity {

  @Id
  @GeneratedValue(
    strategy =
      GenerationType.IDENTITY
  )
  private Long id;

  @ManyToOne
  @JoinColumn(name = "post_id")
  private PostEntity post;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private UserEntity user;

  private LocalDateTime createdAt;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public PostEntity getPost() {
    return post;
  }

  public void setPost(PostEntity post) {
    this.post = post;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(
    LocalDateTime createdAt
  ) {

    this.createdAt = createdAt;
  }
}
