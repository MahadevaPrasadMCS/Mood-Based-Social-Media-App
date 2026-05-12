import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/postService/postservice';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCard {

  constructor(private postService: PostService) {}

  @Input() postId = 0;

  @Input() username = '';

  @Input() userAvatar = '';

  @Input() mood = '';

  @Input() content = '';

  @Input() imageUrl = '';

  @Input() likes = 0;

  @Input() isLiked = false;

  toggleLike() {

  const user =

    JSON.parse(

      localStorage.getItem(
        'user'
      ) || '{}'
    );

  this.postService

    .toggleLike(

      this.postId,

      user.id
    )

    .subscribe({

      next: (response: any) => {

        this.isLiked =
          response.liked;

        this.likes =
          response.likes;

        console.log(
          'LIKE RESPONSE:',
          response
        );
      },

      error: (error) => {

        console.error(error);
      }
    });
  }
}