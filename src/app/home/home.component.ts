import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    CommonModule
  ]
})
export class HomeComponent implements OnInit {

  nome: string = 'Guilherme';
  sobrenome: string = 'França';
  imoveis: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
      this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
        this.imoveis = data;
      });
  }

  verDetalhes(imovelId: string) {
    this.router.navigate(['/detalhes', imovelId]);
  }

  toogleFavorito(index: number): void {
    this.imoveis[index].favorito = !this.imoveis[index].favorito;
  }
}
