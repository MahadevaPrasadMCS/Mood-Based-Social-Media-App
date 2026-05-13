package com.example.moodsync.dto.requests;

public class UpdateProfileRequest {

  private String userName;

  private String bio;

  private String profileImage;

  public String getUserName() {
    return userName;
  }

  public void setUserName(
    String userName
  ) {

    this.userName = userName;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(
    String bio
  ) {

    this.bio = bio;
  }

  public String getProfileImage() {
    return profileImage;
  }

  public void setProfileImage(
    String profileImage
  ) {

    this.profileImage =
      profileImage;
  }
}
