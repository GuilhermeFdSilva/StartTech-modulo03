import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatGridListModule, MatCardModule, NgFor]
})
export class HomeComponent {
  nome: string = 'Guilherme';
  imoveis: string[] = ["batata", "banana", "abacate"];
}
