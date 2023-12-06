import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf, MatSnackBarModule],
})
export class ContatoComponent {

  nome = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  assunto = new FormControl('');
  mensagem = new FormControl('', [Validators.required, Validators.minLength(6)]);

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getErrorMensagem() {
    if (this.nome.hasError('required')) {
      return 'Esse campo é de preenchimento obrigatório!';
    }

    if (this.email.hasError('required')) {
      return 'Esse campo é de preenchimento obrigatório!';
    }

    if (this.email.hasError('email')) {
      return 'Digite um e-mail valido!';
    }

    if (this.mensagem.hasError('required')) {
      return 'Esse campo é de preenchimento obrigatório!';
    }

    if (this.mensagem.hasError('minLength')) {
      return 'Minimo de 6 characteres!';
    }
    return '';
  }

  submitForm() {

    const formData = {
      nome: this.nome.value,
      email: this.email.value,
      assunto: this.assunto.value,
      mensagem: this.mensagem.value
    };

    const body = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('', formData, body)
      .subscribe(
        response => {
          this._snackBar.open('Formulário enviado com sucesso!', 'Fechar', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 5000
          });
        },
        error => {
          console.error('Erro ao enviar o formulário:', error);
          if (error.status === 403) {
            this._snackBar.open('Você não tem permissão para enviar esta mensagem!', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            });
          } else {
            this._snackBar.open('O endereço de destino está incorreto', 'Fechar', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 5000
            });
          }
        });
  }
}
