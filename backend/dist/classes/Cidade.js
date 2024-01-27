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
class Cidade {
    constructor(
    //uf: string,
    //codMun: number,
    //nome: string
    ) {
        this.CodMun = 0;
        this.Nome = '';
        this.Uf = '';
        //this.Uf = uf;
        //this.CodMun = codMun;
        //this.Nome = nome;
    }
    listaCidadesPoruf(uf) {
        return __awaiter(this, void 0, void 0, function* () {
            // create and instantiate an object of Cidade
            var dadosCidade;
            var listaCidades = [];
            try {
                const response = yield fetch(`http://educacao.dadosabertosbr.org/api/cidades/${uf}`);
                const data = yield response.json();
                // mapeia os dados retornados vindo de "data" e armazena em "listaCidades"
                // para retornar os dados
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    let cidade = element.split(':');
                    let codMun = parseInt(cidade[0]);
                    let nome = cidade[1];
                    dadosCidade = new Cidade();
                    dadosCidade.CodMun = codMun;
                    dadosCidade.Nome = nome;
                    dadosCidade.Uf = uf.toUpperCase();
                    listaCidades.push(dadosCidade);
                }
                console.log(listaCidades);
                return JSON.parse(JSON.stringify(listaCidades));
            }
            catch (err) {
                console.log(err);
                return [];
            }
        });
    }
}
exports.default = Cidade;
