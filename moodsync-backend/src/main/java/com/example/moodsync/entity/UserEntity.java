package com.example.moodsync.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String userName;

  private String bio;

  private String profileImage;

  @Column(unique = true)
  private String email;

  private String password;

  @JsonIgnore
  @OneToMany(
    mappedBy = "user",
    cascade = CascadeType.ALL
  )
  private List<PostEntity> posts;

  public Long getId() {
    return id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  public String getProfileImage() {
    return profileImage;
  }

  public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public List<PostEntity> getPosts() {
    return posts;
  }

  public void setPosts(List<PostEntity> posts) {
    this.posts = posts;
  }
}
