import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import Frase from "../shared/frase.model";
import { FRASES } from "./frases.mock";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao: string = "Traduza a frase:";
  public resposta: string = "";

  public rodada: number = 0;
  public rodadaFrase: Frase = {
    fraseEng: "",
    frasePtBr: ""
  };

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit(): void {
  }


  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = "";
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      this.rodada++;

      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === this.frases.length) {
        alert("Você venceu!");
        this.encerrarJogo.emit("vitoria");
      }

      this.atualizaRodada();
    } else {
      this.tentativas--;

      if (this.tentativas === -1) {
        alert("Você perdeu todas as tentativas!");
        this.encerrarJogo.emit("derrota");
      }
    }

  }

}
