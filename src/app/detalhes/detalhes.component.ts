import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  
  imovelId: string;
  imovel: any;

  constructor(private router: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.imovelId = params.get('id') ?? '';
    });
    this.http.get<any>(`https://json-server-start-tech.vercel.app/imoveis/${this.imovelId}`).subscribe(data => {
      this.imovel = data;
    })
  }
}
