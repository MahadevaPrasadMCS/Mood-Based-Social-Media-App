package com.example.moodsync.repository;

import com.example.moodsync.entity.PostEntity;
import com.example.moodsync.entity.PostLikeEntity;
import com.example.moodsync.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface PostLikeRepository

  extends JpaRepository<PostLikeEntity, Long> {

  Optional<PostLikeEntity>

  findByPostAndUser(

    PostEntity post,

    UserEntity user
  );
}
