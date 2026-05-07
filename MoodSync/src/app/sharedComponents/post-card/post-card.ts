import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.html',
  styleUrls: ['./post-card.css'],
})
export class PostCard {

  @Input() username = '';

  @Input() userAvatar = '';

  @Input() mood = '';

  @Input() content = '';

  @Input() imageUrl = '';

  @Input() likes = 0;

  @Input() isLiked = false;

  toggleLike() {

    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.likes++;
    } else {
      this.likes--;
    }
  }
}