import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frases.model'
import { FRASES } from './frases-mock'
import { ProgressoComponent } from '../progresso/progresso.component'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases : Array<Frase> =  FRASES;
  public instrucao : string = "Traduza a frase: ";
  public resposta : string = "";
  public rodada : number = 0;
  public rodadaFrase : Frase;
  public progresso : number = 0;

  constructor() {
    this.rodadaFrase = this.frases[this.rodada];
    console.log(this.rodadaFrase);
   }

  ngOnInit() {
  }

  public atualizaResposta(resposta : Event) : void {
    this.resposta =  (<HTMLInputElement>resposta.target).value;
    console.log(this.resposta);
  }

  public validaResposta() : void {
    if(this.rodadaFrase.frasePtBr == this.resposta){
        this.rodada++;
        this.rodadaFrase = this.frases[this.rodada];
        this.progresso = this.progresso + (100 / this.frases.length)
        console.log(this.progresso)
       alert("Acertou !!");
    }else{
      this.rodada = 0;
      this.progresso = 0;
      this.rodadaFrase = this.frases[this.rodada];
      alert("Eita, tenta de novo.");
    }
  }
}