package com.example.moodsync.dto.responses;

public class FeedPostResponse {

  private Long id;

  private String caption;

  private String mood;

  private String intent;

  private String imageUrl;

  private Integer likes;

  private String username;

  private boolean isLiked;

  private String userAvatar;

  private String createdAt;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public String getMood() {
    return mood;
  }

  public void setMood(String mood) {
    this.mood = mood;
  }

  public String getIntent() {
    return intent;
  }

  public void setIntent(String intent) {
    this.intent = intent;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Integer getLikes() {
    return likes;
  }

  public void setLikes(Integer likes) {
    this.likes = likes;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public boolean isLiked() {
    return isLiked;
  }

  public void setLiked(boolean liked) {
    isLiked = liked;
  }

  public String getUserAvatar() {
    return userAvatar;
  }

  public void setUserAvatar(String userAvatar) {
    this.userAvatar = userAvatar;
  }

  public String getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
  }
}
