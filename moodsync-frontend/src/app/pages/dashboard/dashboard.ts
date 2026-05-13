import { CommonModule } from '@angular/common';

import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { combineLatest } from 'rxjs';

import { PostCard }
from '../../sharedComponents/post-card/post-card';

import { FeedFilterService }
from '../../services/filterService/feedfilterservice';

import { PostService }
from '../../services/postService/postservice';

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
    'Popular'
  ];

  selectedFilter =
    'Most Recent';

  isFilterDropdownOpen =
    false;

  selectedMood =
    'Happy';

  selectedIntent =
    'Improve';

  searchText = '';

  /* ---------------- POSTS ---------------- */

  allPosts: any[] = [];

  filteredPosts: any[] = [];

  /* ---------------- EMPTY STATES ---------------- */

  emptyTitle =
    '';

  emptyMessage =
    '';

  /* ---------------- CONSTRUCTOR ---------------- */

  constructor(

    private feedFilterService:
    FeedFilterService,

    private postService:
    PostService,

    private cdr:
    ChangeDetectorRef

  ) {}

  /* ---------------- INIT ---------------- */

  ngOnInit(): void {

  combineLatest([

    this.feedFilterService.selectedMood$,

    this.feedFilterService.selectedIntent$,

    this.feedFilterService.search$

  ])

  .subscribe(([mood, intent, search]) => {

    this.selectedMood = mood;

    this.selectedIntent = intent;

    this.searchText = search;

    this.loadFeed();
  });
}
  /* ---------------- LOAD POSTS ---------------- */

  loadFeed() {

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

          this.applyFilters();

          this.filteredPosts = [
            ...this.filteredPosts
          ];

          this.cdr.markForCheck();

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

  /* ---------------- APPLY FILTERS ---------------- */

  applyFilters() {

    let posts = [
      ...this.allPosts
    ];

    /* ---------------- SEARCH ---------------- */

    if (
      this.searchText &&
      this.searchText.trim() !== ''
    ) {

      const search =

        this.searchText
          .toLowerCase();

      posts = posts.filter(post =>

        post.username
          ?.toLowerCase()
          .includes(search)

        ||

        post.caption
          ?.toLowerCase()
          .includes(search)
      );
    }

    /* ---------------- SORT ---------------- */

    posts = this.sortPosts(posts);

    this.filteredPosts = posts;

    /* ---------------- EMPTY STATES ---------------- */

    this.updateEmptyState();
  }

  /* ---------------- SORT POSTS ---------------- */

  sortPosts(posts: any[]) {

    /* ---------------- MOST RECENT ---------------- */

    if (
      this.selectedFilter ===
      'Most Recent'
    ) {

      return posts.sort(

        (a, b) =>

          new Date(b.createdAt)
            .getTime()

          -

          new Date(a.createdAt)
            .getTime()
      );
    }

    /* ---------------- POPULAR ---------------- */

    if (
      this.selectedFilter ===
      'Popular'
    ) {

      return posts.sort(

        (a, b) =>

          b.likes - a.likes
      );
    }

    /* ---------------- TRENDING ---------------- */

    if (
      this.selectedFilter ===
      'Trending'
    ) {

      return posts.sort(

        (a, b) => {

          const hoursA =

            (
              new Date().getTime()

              -

              new Date(a.createdAt)
                .getTime()

            ) / 3600000;

          const hoursB =

            (
              new Date().getTime()

              -

              new Date(b.createdAt)
                .getTime()

            ) / 3600000;

          const scoreA =

            a.likes / (
              hoursA + 1
            );

          const scoreB =

            b.likes / (
              hoursB + 1
            );

          return scoreB - scoreA;
        }
      );
    }

    return posts;
  }

  /* ---------------- SELECT FILTER ---------------- */

  selectFilter(filter: string) {

    this.selectedFilter = filter;

    this.applyFilters();

    this.isFilterDropdownOpen = false;
  }

  /* ---------------- DROPDOWN ---------------- */

  toggleFilterDropdown() {

    this.isFilterDropdownOpen =
      !this.isFilterDropdownOpen;
  }

  /* ---------------- EMPTY STATE ---------------- */

  updateEmptyState() {

    /* SEARCH EMPTY */

    if (

      this.searchText.trim() !== '' &&

      this.filteredPosts.length === 0

    ) {

      this.emptyTitle =
        'No search results';

      this.emptyMessage =

        `No posts found for "${this.searchText}"`;

      return;
    }

    /* MOOD EMPTY */

    if (
      this.filteredPosts.length === 0
    ) {

      this.emptyTitle =
        'No posts available';

      this.emptyMessage =

        `No posts found for ${this.selectedMood} mood and ${this.selectedIntent} intent`;

      return;
    }

    /* RESET */

    this.emptyTitle = '';
    this.emptyMessage = '';
  }
}