import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from '../../sharedComponents/header/header';
import { Footer } from '../../sharedComponents/footer/footer';
import { Sidebar } from '../../sharedComponents/sidebar/sidebar';


@Component({
  selector: 'app-user-layout',
  imports: [CommonModule, RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
