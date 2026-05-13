import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {

  FormBuilder,

  FormGroup,

  ReactiveFormsModule,

  Validators

} from '@angular/forms';

import {

  ImageCropperComponent,

  ImageCroppedEvent

} from 'ngx-image-cropper';

import { CloudinaryService }
from '../../services/cloudService/cloudinaryservice';

import { PostService }
from '../../services/postService/postservice';

@Component({
  selector: 'app-create-post',

  standalone: true,

  imports: [

    CommonModule,

    ReactiveFormsModule,

    ImageCropperComponent
  ],

  templateUrl: './create-post.html',

  styleUrl: './create-post.css',
})

export class CreatePost {

  /* ---------------- FORM ---------------- */

  postForm!: FormGroup;

  /* ---------------- IMAGE ---------------- */

  selectedImage:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  imageChangedEvent: any = '';

  croppedImage: any = '';

  zoomScale = 1;

  rotation = 0;

  /* ---------------- LOADING ---------------- */

  isUploading = false;

  /* ---------------- MOODS ---------------- */

  moods = [

    'Happy',

    'Sad',

    'Relax',

    'Stress'
  ];

  /* ---------------- CONSTRUCTOR ---------------- */

  constructor(

    private fb: FormBuilder,

    private cloudinaryService:
    CloudinaryService,

    private postService:
    PostService

  ) {

    this.postForm =

      this.fb.group({

        caption: [

          '',

          Validators.required
        ],

        mood: [

          this.moods[0],

          Validators.required
        ]
      });
  }

  /* ---------------- IMAGE SELECT ---------------- */

  onImageSelect(event: any) {

    this.imageChangedEvent =
      event;

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedImage =
      file;
  }

  /* ---------------- IMAGE CROPPED ---------------- */

  imageCropped(
    event: ImageCroppedEvent
  ) {

    this.croppedImage =
      event.blob;

    this.imagePreview =
      event.objectUrl || '';
  }

  /* ---------------- ROTATE ---------------- */

  rotateLeft() {

    this.rotation -= 90;
  }

  rotateRight() {

    this.rotation += 90;
  }

  /* ---------------- ZOOM ---------------- */

  zoomIn() {

    this.zoomScale += 0.1;
  }

  zoomOut() {

    if (this.zoomScale > 0.2) {

      this.zoomScale -= 0.1;
    }
  }

  /* ---------------- CREATE POST ---------------- */

  createPost() {

    if (
      this.postForm.invalid ||
      !this.croppedImage
    ) {

      return;
    }

    this.isUploading = true;

    /* ---------------- CONVERT BLOB TO FILE ---------------- */

    const file = new File(

      [this.croppedImage],

      'post-image.png',

      {
        type: 'image/png'
      }
    );

    /* ---------------- UPLOAD IMAGE ---------------- */

    this.cloudinaryService

      .uploadImage(file)

      .subscribe({

        next: (response: any) => {

          const imageUrl =

            response.secure_url;

          /* ---------------- USER ---------------- */

          const user =

            JSON.parse(

              localStorage.getItem(
                'user'
              ) || '{}'
            );

          /* ---------------- PAYLOAD ---------------- */

          const payload = {

            userId: user.id,

            caption:
              this.postForm.value.caption,

            mood:
              this.postForm.value.mood,

            imageUrl
          };

          /* ---------------- SAVE POST ---------------- */

          this.postService

            .createPost(payload)

            .subscribe({

              next: () => {

                this.isUploading = false;

                alert(
                  'Post created 🚀'
                );

                this.postForm.reset({

                  mood:
                    this.moods[0]
                });

                this.imagePreview =
                  null;

                this.selectedImage =
                  null;

                this.imageChangedEvent =
                  '';

                this.croppedImage =
                  '';
              },

              error: (error) => {

                console.error(error);

                this.isUploading =
                  false;
              }
            });
        },

        error: (error) => {

          console.error(error);

          this.isUploading =
            false;
        }
      });
  }
}