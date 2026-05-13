import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedFilterService } from '../../services/filterService/feedfilterservice';
import { Authservice } from '../../services/authService/authservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {

  constructor(private router: Router,
    private feedFilterService: FeedFilterService,
    private authService: Authservice
  ) {}
  /* ---------------- MOOD DROPDOWN ---------------- */

  isMoodDropdownOpen = false;

  moods = [
    { label: 'Happy', icon: '😊' },
    { label: 'Sad', icon: '😔' },
    { label: 'Relaxed', icon: '🌿' },
    { label: 'Stressed', icon: '😰' }
  ];

  selectedMood = this.moods[0];

  /* ---------------- INTENT DROPDOWN ---------------- */

  isIntentDropdownOpen = false;

  intents = [
    { label: 'Improve' },
    { label: 'Be In' }
  ];

  selectedIntent = this.intents[0];

  /* ---------------- PROFILE DROPDOWN ---------------- */
  isProfileDropdownOpen = false;

  navigations = [
    { label: 'Profile' },
    { label: 'Logout' }
  ];

  /* ---------------- PROFILE METHODS ---------------- */

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;

    if (this.isProfileDropdownOpen) {
      this.isMoodDropdownOpen = false;
      this.isIntentDropdownOpen = false;
    }
  }

  loadProfile() {
    this.router.navigate(['/user/profile']);
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  /* ---------------- MOOD METHODS ---------------- */

  toggleMoodDropdown() {
    this.isMoodDropdownOpen = !this.isMoodDropdownOpen;

    if (this.isMoodDropdownOpen) {
      this.isIntentDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }

  selectMood(mood: any) {

    this.selectedMood = mood;

    console.log(
      'SELECTED MOOD:',
      mood.label
    );

    this.feedFilterService
      .setMood(mood.label);

    this.isMoodDropdownOpen = false;
  }

  /* ---------------- INTENT METHODS ---------------- */

  toggleIntentDropdown() {
    this.isIntentDropdownOpen = !this.isIntentDropdownOpen;

    if (this.isIntentDropdownOpen) {
      this.isMoodDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }

  selectIntent(intent: any) {

    this.selectedIntent = intent;

    this.feedFilterService.setIntent(
      intent.label
    );

    this.isIntentDropdownOpen = false;
  }

  /* ---------------- SEARCH ---------------- */

  searchText = '';

  onSearchChange() {

    this.feedFilterService.setSearch(
      this.searchText
    );
  }

  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */

  @HostListener('document:click', ['$event'])
  closeDropdowns(event: Event) {

    const targetElement = event.target as HTMLElement;

    const clickedInsideDropdown =
      targetElement.closest('.custom-dropdown');

    if (!clickedInsideDropdown) {
      this.isMoodDropdownOpen = false;
      this.isIntentDropdownOpen = false;
      this.isProfileDropdownOpen = false;
    }
  }
}