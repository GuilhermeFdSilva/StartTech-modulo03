import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
    CommonModule,
    MatSnackBarModule
  ]
})
export class HomeComponent implements OnInit {

  nome: string = 'Guilherme';
  sobrenome: string = 'França';
  imoveis: any;
  imovel: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
      this.imoveis = data;
    });
  }

  verDetalhes(imovelId: string) {
    this.router.navigate(['/detalhes', imovelId]);
  }

  toogleFavorito(imovelId: number): void {
    this.http.get<any>('http://localhost:3000/imoveis/' + imovelId).subscribe(data => {
      this.imovel = data;
      this.imovel.favorito = !this.imovel.favorito;

      this.http.patch('http://localhost:3000/imoveis/' + imovelId, { favorito: this.imovel.favorito })
        .subscribe(
          response => {
            if (this.imovel.favorito) {
              this._snackBar.open('O imóvel foi favoritado', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            } else {
              this._snackBar.open('Imóvel removido dos favoritos', 'Fechar', {
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                duration: 5000
              });
            }
            this.http.get<any>('http://localhost:3000/imoveis').subscribe(data => {
              this.imoveis = data;
            });
          },
          error => {
            console.log("Ocorreu um erro!");
            this.imovel.favorito = !this.imovel.favorito;
          }
        );
    });
  }
}
