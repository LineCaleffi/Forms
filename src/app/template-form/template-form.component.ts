import { map } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  /*
    usuario: any={
      nome: 'Aline',
      email: 'email@email.com'
    }
  */

  ngOnInit() {
  }

  onSubmit(form: any) {
    console.log(form);
    //console.log(this.usuario);
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  //mostra no console todas as informações do cep informado (rua, bairro, cidade)
  consultaCEP(cep: any, form: any) {

    cep = cep.replace(/\D/g, '');

    //Verifica se o campo cep possui valor informado
    if (cep != "") {
      //Expressão regular para validar o CEP
      var validaCep = /^[0-9]{8}$/;

      //Valida o formato do CEP
      if (validaCep.test(cep)) {
        //Consulta o webservice viacep.com.br/
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => console.log(dados));
      }
    }
  }

}
