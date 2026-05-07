import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostCard } from '../../sharedComponents/post-card/post-card';

@Component({
  selector: 'app-dashboard',
  imports: [ CommonModule, PostCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  
  searchFilters = [
  'Most Recent',
  'Trending',
  'Popular',
  'Following'
];

selectedFilter = 'Most Recent';

isFilterDropdownOpen = false;

toggleFilterDropdown() {
  this.isFilterDropdownOpen =
    !this.isFilterDropdownOpen;
}

selectFilter(filter: string) {
  this.selectedFilter = filter;

  this.isFilterDropdownOpen = false;
}
}
