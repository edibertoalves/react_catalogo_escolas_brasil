"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Escola {
    constructor() {
        this.AnoCenso = 0;
        this.Codigo = 0;
        this.Nome = "";
        this.CodCidade = 0;
        this.Cidade = "";
        this.Estado = "";
        this.Regiao = "";
        this.SituacaoFuncionamento = "";
        this.DependenciaAdministrativa = "";
        this.IdebAI = 0;
        this.IdebAF = 0;
        this.EnemMediaGeral = 0;
        this.SituacaoFuncionamentoTxt = "";
        this.DependenciaAdministrativaTxt = "";
    }
    listaEscolasPorCidade(codMun) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://educacao.dadosabertosbr.org/api/escolas/buscaavancada?cidade=${codMun}`);
            const data = yield response.json();
            let escolas = data[1].map((item) => {
                return {
                    anoCenso: item.anoCenso,
                    cod: item.cod,
                    nome: item.nome,
                    codCidade: item.codCidade,
                    cidade: item.cidade,
                    estado: item.estado,
                    regiao: item.regiao,
                    situacaoFuncionamento: item.situacaoFuncionamento,
                    dependenciaAdministrativa: item.dependenciaAdministrativa,
                    idebAI: item.idebAI,
                    idebAF: item.idebAF,
                    enemMediaGeral: item.enemMediaGeral,
                    situacaoFuncionamentoTxt: item.situacaoFuncionamentoTxt,
                    dependenciaAdministrativaTxt: item.dependenciaAdministrativaTxt
                };
            });
            return escolas;
        });
    }
}
exports.default = Escola;
