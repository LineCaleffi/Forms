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
  ngOnInit() {}

  onSubmit(form: any) {
    console.log(form);
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
        this.resetaDadosForm(form);

        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => this. populaDadosForm(dados, form)
          )
      }else {
        this.resetaDadosForm(form);
        alert("CEP inválido.");
    } 
    }
  }

  /*
     AULA 86Forms (template driven) 
     Populando campos com setValue e patchValue
  */

  populaDadosForm(dados: any, formulario: any){
    /*
    // O SetValue atualiza todo formulário quando coloca o CEP
    formulario.setValue({
      nome: null,
      email: null,
      // pega os dados conforme o site VIACEP 
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro ,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
    */

    // O PatchValue não atualiza o restante do formulário quando coloca o CEP, apenas os campos que definimos
    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro ,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  //reseta antes da consulta do CEP
  resetaDadosForm(formulario: any){
    formulario.form.patchValue({
      endereco: {
        rua: null,
        cep:null,
        numero: null,
        complemento: null,
        bairro: null ,
        cidade: null,
        estado: null
      }
    });
  }
}
