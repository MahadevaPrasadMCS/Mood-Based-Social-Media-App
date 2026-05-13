import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterModule }
from '@angular/router';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './sidebar.html',

  styleUrls: ['./sidebar.css'],
})

export class Sidebar
implements OnInit {

  isCollapsed = false;

  userName = 'User';

  ngOnInit(): void {

  this.loadUser();

    window.addEventListener(

    'userUpdated',

    () => {

      setTimeout(() => {

        this.loadUser();

      });
    }
  );
}

  loadUser() {

    const user = JSON.parse(

      localStorage.getItem(
        'user'
      ) || '{}'
    );

    this.userName =

      user.username ||

      user.userName ||

      'User';
  }

  toggleSidebar() {

    this.isCollapsed =
      !this.isCollapsed;
  }

  menuItems = [

    {
      label: 'Dashboard',
      route: '/user/dashboard',
      icon: 'dashboard'
    },

    {
      label: 'Create Post',
      route: '/user/create-post',
      icon: 'create-post'
    }
  ];
}