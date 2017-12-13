import { Component, OnInit,EventEmitter,Output, OnDestroy} from '@angular/core';
import { Frase } from '../shared/frases.model'
import { FRASES } from './frases-mock'
import { ProgressoComponent } from '../progresso/progresso.component'
import { TentativasComponent } from '../tentativas/tentativas.component'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit,OnDestroy {

  public frases : Array<Frase> =  FRASES;
  public instrucao : string = "Traduza a frase: ";
  public resposta : string = "";
  public rodada : number = 0;
  public rodadaFrase : Frase;
  public progresso : number = 0;
  public tentativas : number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
   }

  ngOnInit() {
  }
  ngOnDestroy(){
  }

  public atualizaResposta(resposta : Event) : void {
    this.resposta =  (<HTMLInputElement>resposta.target).value;
  }

  public validaResposta() : void {
    if(this.rodadaFrase.frasePtBr == this.resposta){
        this.rodada++;
        if(this.rodada ==  4){
          this.encerrarJogo.emit('vitoria');
        }
        this.atualizaRodada();
        this.progresso = this.progresso + (100 / this.frases.length);
    }else{
      this.tentativas--;
      if(this.tentativas == -1){
        this.encerrarJogo.emit('derrota');
      }
      this.atualizaRodada();
    }
  }

  private atualizaRodada() : void{
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}