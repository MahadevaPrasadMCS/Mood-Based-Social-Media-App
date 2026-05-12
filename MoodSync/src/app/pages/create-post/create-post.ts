import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CloudinaryService } from '../../services/cloudService/cloudinaryservice';
import { PostService } from '../../services/postService/postservice';

@Component({
  selector: 'app-create-post',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './create-post.html',

  styleUrl: './create-post.css',
})

export class CreatePost {

  postForm!: FormGroup;

  selectedImage:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  isUploading = false;

  moods = [
    'Happy',
    'Sad',
    'Relaxed',
    'Focused',
    'Excited'
  ];

  intents = [
    'Improve',
    'Be In'
  ];

  constructor(

    private fb: FormBuilder,

    private cloudinaryService:
    CloudinaryService,

    private postService: PostService

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
        ],

        intent: [
          this.intents[0],
          Validators.required
        ]
      });
  }

  /* ---------------- IMAGE SELECT ---------------- */

  onImageSelect(event: any) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedImage = file;

    const reader =
      new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result;
    };

    reader.readAsDataURL(file);
  }

  /* ---------------- SUBMIT ---------------- */

  createPost() {

  if (
    this.postForm.invalid ||
    !this.selectedImage
  ) {

    return;
  }

  this.isUploading = true;

  /* ---------------- UPLOAD IMAGE ---------------- */

  this.cloudinaryService
    .uploadImage(
      this.selectedImage
    )

    .subscribe({

      next: (response: any) => {

        const imageUrl =
          response.secure_url;

        console.log(
          'Cloudinary URL:',
          imageUrl
        );

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

          intent:
            this.postForm.value.intent,

          imageUrl
        };

        console.log(
          'POST PAYLOAD:',
          payload
        );

        /* ---------------- SAVE POST ---------------- */

        this.postService
          .createPost(payload)

          .subscribe({

            next: (res: any) => {

              console.log(
                'POST SAVED:',
                res
              );

              this.isUploading = false;

              alert(
                'Post created successfully 🚀'
              );

              this.postForm.reset({

                mood: this.moods[0],

                intent: this.intents[0]
              });

              this.imagePreview = null;

              this.selectedImage = null;
            },

            error: (error) => {

              console.error(error);

              this.isUploading = false;

              alert(
                'Failed to save post'
              );
            }
          });
      },

      error: (error) => {

        console.error(error);

        this.isUploading = false;

        alert(
          'Image upload failed'
        );
      }
    });
  }
}