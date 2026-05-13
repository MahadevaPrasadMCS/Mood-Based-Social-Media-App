import {

  Component,

  Input,

  ChangeDetectorRef

} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { PostService }
from '../../services/postService/postservice';

@Component({
  selector: 'app-post-card',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './post-card.html',

  styleUrls: ['./post-card.css'],
})

export class PostCard {

  constructor(

    private postService:
    PostService,

    private cdr:
    ChangeDetectorRef

  ) {}

  @Input() postId = 0;

  @Input() username = '';

  @Input() userAvatar = '';

  @Input() mood = '';

  @Input() content = '';

  @Input() imageUrl = '';

  @Input() createdAt = '';

  @Input() likes = 0;

  @Input() isLiked = false;

  /* ---------------- TOGGLE LIKE ---------------- */

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

          /* FORCE UI UPDATE */

          this.cdr.detectChanges();

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

  /* ---------------- RELATIVE TIME ---------------- */

getTimeAgo(date: string): string {

  const seconds = Math.floor(

    (
      new Date().getTime()

      -

      new Date(date).getTime()

    ) / 1000
  );

  const intervals = [

    {
      label: 'year',
      seconds: 31536000
    },

    {
      label: 'month',
      seconds: 2592000
    },

    {
      label: 'day',
      seconds: 86400
    },

    {
      label: 'hour',
      seconds: 3600
    },

    {
      label: 'minute',
      seconds: 60
    },

    {
      label: 'second',
      seconds: 1
    }
  ];

  for (const interval of intervals) {

    const count = Math.floor(

      seconds / interval.seconds
    );

    if (count >= 1) {

      return `${count} ${interval.label}${
        count > 1 ? 's' : ''
      } ago`;
    }
  }

  return 'Just now';
}
}