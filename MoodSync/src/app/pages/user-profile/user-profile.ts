import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile {

  user = {
    name: 'Mahadeva Prasad M',
    username: '@mahadeva.prasad',
    bio: 'Building MoodSync 🚀 | Sharing moods, moments and positivity everyday.',
    image:
      'https://i.pravatar.cc/300?img=12',

    posts: 24,
    likes: 182
  };

  posts = [

    {
      id: 1,
      mood: 'Happy 😊',
      caption:
        'Feeling productive today and building MoodSync 🚀',

      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085',

      likes: 32,
      time: '2h ago'
    },

    {
      id: 2,
      mood: 'Calm 🌿',
      caption:
        'Late night coding sessions with coffee ☕',

      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',

      likes: 18,
      time: '5h ago'
    },

    {
      id: 3,
      mood: 'Focused 💻',
      caption:
        'UI polishing for MoodSync profile page ✨',

      image:
        'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931',

      likes: 41,
      time: '1d ago'
    }

  ];
}