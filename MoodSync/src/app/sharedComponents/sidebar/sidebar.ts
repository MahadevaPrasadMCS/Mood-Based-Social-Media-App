import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {

  isCollapsed = false;

  user = localStorage.getItem('user') || 'User';

  userName = JSON.parse(this.user).username || 'User';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
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