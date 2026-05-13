package com.example.moodsync.service;

import com.example.moodsync.dto.requests.CreatePostRequest;
import com.example.moodsync.dto.responses.FeedPostResponse;
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
    public Map<String, Object> createPost(CreatePostRequest request) {
        UserEntity user = userRepository.findById(request.getUserId()).orElseThrow();
        PostEntity post = new PostEntity();

        post.setCaption(request.getCaption());
        post.setMood(request.getMood());
        post.setIntent(request.getIntent());
        post.setImageUrl(request.getImageUrl());
        post.setCreatedAt(LocalDateTime.now());
        post.setUser(user);

        postRepository.save(post);

        return Map.of(
            "success", true,
            "message", "Post created"
        );
    }

    // USER POSTS
    public List<FeedPostResponse> getUserPosts(Long userId) {
        List<PostEntity> posts = postRepository.findByUserId(userId);
        UserEntity currentUser = userRepository.findById(userId).orElseThrow();

        return posts.stream()
            .map(post -> {
                FeedPostResponse response = new FeedPostResponse();
                response.setId(post.getId());
                response.setCaption(post.getCaption());
                response.setMood(post.getMood());
                response.setIntent(post.getIntent());
                response.setImageUrl(post.getImageUrl());
                response.setLikes(post.getLikes());
                response.setCreatedAt(post.getCreatedAt().toString());
                response.setUsername(post.getUser().getUserName());
                response.setUserAvatar(post.getUser().getProfileImage());

                boolean liked = postLikeRepository.findByPostAndUser(post, currentUser).isPresent();
                response.setLiked(liked);

                return response;
            })
            .toList();
    }

    // FEED POSTS
    public List<FeedPostResponse> getFeedPosts(Long userId, String mood, String intent) {
        List<String> recommendedMoods = getRecommendedMoods(mood, intent);
        List<PostEntity> posts = postRepository.findByUserIdNotAndMoodIn(userId, recommendedMoods);
        UserEntity currentUser = userRepository.findById(userId).orElseThrow();

        return posts.stream()
            .map(post -> {
                FeedPostResponse response = new FeedPostResponse();
                response.setId(post.getId());
                response.setCaption(post.getCaption());
                response.setMood(post.getMood());
                response.setIntent(post.getIntent());
                response.setImageUrl(post.getImageUrl());
                response.setLikes(post.getLikes());
                response.setCreatedAt(post.getCreatedAt().toString());
                response.setUsername(post.getUser().getUserName());

                response.setUserAvatar(
                    post.getUser().getProfileImage() != null
                        ? post.getUser().getProfileImage()
                        : "https://i.pravatar.cc/150?img=" + post.getUser().getId()
                );

                boolean liked = postLikeRepository.findByPostAndUser(post, currentUser).isPresent();
                response.setLiked(liked);

                return response;
            })
            .toList();
    }

    // TOGGLE LIKE
    public Map<String, Object> toggleLike(Long postId, Long userId) {
        PostEntity post = postRepository.findById(postId).orElseThrow();
        UserEntity user = userRepository.findById(userId).orElseThrow();
        Optional<PostLikeEntity> existingLike = postLikeRepository.findByPostAndUser(post, user);

        boolean liked;

        if (existingLike.isPresent()) {
            postLikeRepository.delete(existingLike.get());
            post.setLikes(post.getLikes() - 1);
            liked = false;
        } else {
            PostLikeEntity like = new PostLikeEntity();
            like.setPost(post);
            like.setUser(user);
            like.setCreatedAt(LocalDateTime.now());
            postLikeRepository.save(like);

            post.setLikes(post.getLikes() + 1);
            liked = true;
        }

        postRepository.save(post);

        return Map.of(
            "success", true,
            "liked", liked,
            "likes", post.getLikes()
        );
    }

    // MOOD MAPPING
    private List<String> getRecommendedMoods(String mood, String intent) {
        mood = mood.trim();
        intent = intent.trim();

        switch (mood) {
            case "Happy" -> {
                System.out.println("MOOD = " + mood);
                System.out.println("INTENT = " + intent);
                String recommendedMoods = "Happy";
                System.out.println("RECOMMENDED = " + recommendedMoods);
                return List.of("Happy");
            }
            case "Sad" -> {
                if (intent.equalsIgnoreCase("Improve")) {
                    System.out.println("MOOD = " + mood);
                    System.out.println("INTENT = " + intent);
                    String recommendedMoods = "Happy + Relaxed";
                    System.out.println("RECOMMENDED = " + recommendedMoods);
                    return List.of("Happy", "Relaxed");
                }
                System.out.println("MOOD = " + mood);
                System.out.println("INTENT = " + intent);
                String recommendedMoods = "Sad";
                System.out.println("RECOMMENDED = " + recommendedMoods);
                return List.of("Sad");
            }
            case "Relaxed" -> {
                System.out.println("MOOD = " + mood);
                System.out.println("INTENT = " + intent);
                String recommendedMoods = "Relaxed";
                System.out.println("RECOMMENDED = " + recommendedMoods);
                return List.of("Relaxed");
            }
            default -> {
                return List.of(mood);
            }
        }
    }
}
