import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CloudinaryService {

  private cloudName =
    'dxscpoyzn';

  private uploadPreset =
    'moodsync_uploads';

  constructor(
    private http: HttpClient
  ) {}

  uploadImage(file: File) {

    const formData =
      new FormData();

    formData.append(
      'file',
      file
    );

    formData.append(
      'upload_preset',
      this.uploadPreset
    );

    return this.http.post(

      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,

      formData
    );
  }
}