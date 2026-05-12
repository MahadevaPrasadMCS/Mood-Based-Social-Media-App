import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedFilterService {

  private moodSource =
    new BehaviorSubject<string>('Happy');

  private intentSource =
    new BehaviorSubject<string>('Improve');

  selectedMood$ =
    this.moodSource.asObservable();

  selectedIntent$ =
    this.intentSource.asObservable();

  setMood(mood: string) {

    this.moodSource.next(mood);
  }

  setIntent(intent: string) {

    this.intentSource.next(intent);
  }
}