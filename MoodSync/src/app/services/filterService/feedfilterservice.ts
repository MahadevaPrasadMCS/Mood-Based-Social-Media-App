import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FeedFilterService {

  /* ---------------- MOOD ---------------- */

  private moodSource =

    new BehaviorSubject<string>(
      'Happy'
    );

  selectedMood$ =
    this.moodSource.asObservable();

  /* ---------------- INTENT ---------------- */

  private intentSource =

    new BehaviorSubject<string>(
      'Improve'
    );

  selectedIntent$ =
    this.intentSource.asObservable();

  /* ---------------- SEARCH ---------------- */

  private searchSource =

    new BehaviorSubject<string>(
      ''
    );

  search$ =
    this.searchSource.asObservable();

  /* ---------------- SETTERS ---------------- */

  setMood(mood: string) {

    console.log(
      'MOOD CHANGED:',
      mood
    );

    this.moodSource.next(mood);
  }

  setIntent(intent: string) {

    console.log(
      'INTENT CHANGED:',
      intent
    );

    this.intentSource.next(intent);
  }

  setSearch(search: string) {

    this.searchSource.next(search);
  }

  /* ---------------- GETTERS ---------------- */

  getCurrentMood() {

    return this.moodSource.value;
  }

  getCurrentIntent() {

    return this.intentSource.value;
  }

  getCurrentSearch() {

    return this.searchSource.value;
  }
}