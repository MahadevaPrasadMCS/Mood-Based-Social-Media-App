package com.example.moodsync.repository;

import com.example.moodsync.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository
  extends JpaRepository<PostEntity, Long> {

  List<PostEntity>
  findByUserId(Long userId);

  List<PostEntity>
  findByUserIdNot(Long userId);

  List<PostEntity>
  findByUserIdNotAndMoodAndIntent(
    Long userId,
    String mood,
    String intent
  );
}
