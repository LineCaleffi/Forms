import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit{
  usuario: any = {
    nome: null,
    email: null
  }

  constructor( 
   ) { }

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

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

}
