import {

  Component,

  OnInit,

  ChangeDetectorRef

} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { PostCard }
from '../../sharedComponents/post-card/post-card';

import { PostService }
from '../../services/postService/postservice';

import { Authservice }
from '../../services/authService/authservice';

import { CloudinaryService }
from '../../services/cloudService/cloudinaryservice';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    PostCard
  ],

  templateUrl: './user-profile.html',

  styleUrls: ['./user-profile.css']
})

export class UserProfile
implements OnInit {

  /* ---------------- USER ---------------- */

  user: any = {};

  /* ---------------- POSTS ---------------- */

  posts: any[] = [];

  /* ---------------- STATS ---------------- */

  totalPosts = 0;

  totalLikes = 0;

  /* ---------------- EDIT ---------------- */

  isEditMode = false;

  editedBio = '';

  editedUsername = '';

  selectedProfileImage:
    File | null = null;

  uploadedProfileImageUrl = '';

  isSaving = false;

  /* ---------------- CONSTRUCTOR ---------------- */

  constructor(

    private postService:
    PostService,

    private authService:
    Authservice,

    private cloudinaryService:
    CloudinaryService,

    private cdr:
    ChangeDetectorRef

  ) {}

  /* ---------------- INIT ---------------- */

  ngOnInit(): void {

    const currentUser =

      JSON.parse(

        localStorage.getItem(
          'user'
        ) || '{}'
      );

    this.user = {

      ...currentUser,

      userName:

        currentUser.userName ||

        currentUser.username,

      image:

        currentUser.profileImage ||

        `https://i.pravatar.cc/300?img=${currentUser.id}`,

      bio:

        currentUser.bio ||

        'Building MoodSync 🚀',

      
    };

      this.editedBio =
      this.user.bio;

      this.editedUsername =
      this.user.userName;

    this.loadUserPosts();
    
  }
  /* ---------------- LOAD POSTS ---------------- */

  loadUserPosts() {

    const currentUser =

      JSON.parse(

        localStorage.getItem(
          'user'
        ) || '{}'
      );

    this.postService

      .getUserPosts(
        currentUser.id
      )

      .subscribe({

        next: (posts: any) => {

          this.posts = posts;

          this.totalPosts =
            posts.length;

          this.totalLikes =
            posts.reduce(

              (
                total: number,

                post: any
              ) =>

                total + post.likes,

              0
            );

          this.cdr.detectChanges();
          console.log(
            'PROFILE POSTS:',
            posts
          );
        },

        error: (error) => {

          console.error(error);
        }
      });
  }

  /* ---------------- EDIT PROFILE ---------------- */

  toggleEditMode() {

    this.isEditMode =
      !this.isEditMode;
  }

  /* ---------------- SELECT + UPLOAD IMAGE ---------------- */

  onProfileImageSelect(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedProfileImage =
      file;

    /* PREVIEW IMAGE */

    const reader =
      new FileReader();

    reader.onload = () => {

      this.user.image =
        reader.result;
    };

    reader.readAsDataURL(file);

    /* UPLOAD TO CLOUDINARY */

    this.cloudinaryService

      .uploadImage(file)

      .subscribe({

        next: (response: any) => {

          console.log(
            'CLOUDINARY IMAGE:',
            response
          );

          this.uploadedProfileImageUrl =

            response.secure_url;

          /* SET REAL CLOUDINARY URL */

          this.user.image =

            this.uploadedProfileImageUrl;
        },

        error: (error) => {

          console.error(error);

          alert(
            'Image upload failed'
          );
        }
      });
  }

  /* ---------------- SAVE PROFILE ---------------- */

saveProfile() {

  this.isSaving = true;

  const payload = {

    userName:
      this.editedUsername,

    bio:
      this.editedBio,

    profileImage:

      this.uploadedProfileImageUrl ||

      this.user.image
  };

  this.authService

    .updateProfile(

      this.user.id,

      payload
    )

    .subscribe({

      next: (response: any) => {

        /* UPDATE UI */

        this.user = {

          ...this.user,

          userName:
            response.user.username,

          username:
            response.user.username,

          bio:
            response.user.bio,

          image:
            response.user.profileImage
        };

        /* UPDATE FORM VALUES */

        this.editedUsername =
          response.user.userName;

        this.editedBio =
          response.user.bio;

        /* UPDATE LOCAL STORAGE */

        this.authService.saveUser({

          id:
            this.user.id,

          userName:
            response.user.username,

          email:
            this.user.email,

          bio:
            response.user.bio,

          profileImage:
            response.user.profileImage
        });

        window.dispatchEvent(
          new Event('userUpdated')
        );

        /* RESET STATES */

        this.isSaving = false;

        this.isEditMode = false;

        this.uploadedProfileImageUrl = '';

        /* FORCE UI REFRESH */

        this.cdr.detectChanges();

        console.log(
          'PROFILE UPDATED',
          response
        );
      },

      error: (error) => {

        console.error(error);

        this.isSaving = false;

        this.cdr.detectChanges();
      }
    });
}
}