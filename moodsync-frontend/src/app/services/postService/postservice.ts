import { Injectable }
from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private API_URL =
    'https://mood-based-social-media-app.onrender.com/api/posts';

  constructor(
    private http: HttpClient
  ) {}

  /* CREATE POST */

  createPost(postData: any) {

    return this.http.post(

      `${this.API_URL}/create`,

      postData
    );
  }

  /* TOGGLE LIKE */

  toggleLike(

    postId: number,

    userId: number

  ) {

    return this.http.post(

      `${this.API_URL}/${postId}/like?userId=${userId}`,

      {}
    );
  }

  /* FEED POSTS */

  getFeedPosts(

    userId: number,

    mood: string,

    intent: string

  ) {

    return this.http.get(

      `${this.API_URL}/feed` +

      `?userId=${userId}` +

      `&mood=${mood}` +

      `&intent=${intent}`
    );
  }

  /* USER POSTS */

  getUserPosts(userId: number) {

    return this.http.get(

      `${this.API_URL}/user/${userId}`
    );
  }

}