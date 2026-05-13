package com.example.moodsync.repository;

import com.example.moodsync.entity.PostEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository
  extends JpaRepository<PostEntity, Long> {

  /* ---------------- USER POSTS ---------------- */

  List<PostEntity>
  findByUserId(Long userId);

  /* ---------------- FEED POSTS ---------------- */

  List<PostEntity>
  findByUserIdNotAndMoodIn(

    Long userId,

    List<String> moods
  );
}
