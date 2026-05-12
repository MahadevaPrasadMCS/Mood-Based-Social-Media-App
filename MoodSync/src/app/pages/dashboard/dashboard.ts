import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit
} from '@angular/core';

import { PostCard }
from '../../sharedComponents/post-card/post-card';

import { FeedFilterService } from '../../services/filterService/feedfilterservice';
import { PostService } from '../../services/postService/postservice';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    PostCard
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css'],
})

export class Dashboard
implements OnInit {

  /* ---------------- FILTERS ---------------- */

  searchFilters = [

    'Most Recent',
    'Trending',
    'Popular',
    'Following'

  ];

  selectedFilter =
    'Most Recent';

  isFilterDropdownOpen =
    false;

  selectedMood =
    'Happy';

  selectedIntent =
    'Improve';

  /* ---------------- POSTS ---------------- */

  allPosts: any[] = [];

  filteredPosts: any[] = [];

  /* ---------------- CONSTRUCTOR ---------------- */

  constructor(
    private feedFilterService:
    FeedFilterService,
    private postService: PostService
  ) {}

  /* ---------------- INIT ---------------- */

  ngOnInit(): void {

    this.feedFilterService
      .selectedMood$
      .subscribe(mood => {

        this.selectedMood = mood;

        this.filterPosts();
      });

    this.feedFilterService
      .selectedIntent$
      .subscribe(intent => {

        this.selectedIntent = intent;

        this.filterPosts();
      });
  }

  /* ---------------- FILTER POSTS ---------------- */

  filterPosts() {

  const currentUser =

    JSON.parse(

      localStorage.getItem(
        'user'
      ) || '{}'
    );

  this.postService

    .getFeedPosts(

      currentUser.id,

      this.selectedMood,

      this.selectedIntent
    )

    .subscribe({

      next: (posts: any) => {

        this.allPosts = posts;

        this.filteredPosts =
          [...posts];

        this.sortPosts();

        console.log(
          'FEED POSTS:',
          posts
        );
      },

      error: (error) => {

        console.error(error);
      }
    });
}

  /* ---------------- FILTER DROPDOWN ---------------- */

  toggleFilterDropdown() {

    this.isFilterDropdownOpen =
      !this.isFilterDropdownOpen;
  }

  sortPosts() {

    if (
      this.selectedFilter ===
      'Popular'
    ) {

      this.filteredPosts.sort(
        (a, b) =>
          b.likes - a.likes
      );
    }

    else if (
      this.selectedFilter ===
      'Most Recent'
    ) {

      this.filteredPosts.sort(
        (a, b) =>

          new Date(b.createdAt)
          .getTime()

          -

          new Date(a.createdAt)
          .getTime()
      );
    }
  }

  selectFilter(filter: string) {

    this.selectedFilter = filter;

    this.sortPosts();

    this.isFilterDropdownOpen = false;
  }
}