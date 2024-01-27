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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Cidade_1 = __importDefault(require("./classes/Cidade"));
const Escola_1 = __importDefault(require("./classes/Escola"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
var listaCidades = [];
var listaEscolas = [];
app.use((0, cors_1.default)({
    origin: '*', // ou especifique o domínio permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: false
}));
app.get("/", (req, res) => {
    res.send("Servidor em execução");
});
// obtem a lista de cidades, passando o UF como parametro
app.get('/escolas/cidades/:uf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // instancia o array que servirá com uma lista de cidades por UF
    listaCidades = [];
    // faz uma busca para retornar todas as cidades, passando o estado como parametro
    const cidade = new Cidade_1.default();
    listaCidades = yield cidade.listaCidadesPoruf(req.params.uf);
    res.send(listaCidades);
}));
// faz uma busca para retornar todas as cidades, passando o estado como parametro
app.get('/escolas/municipioescolas/:codmun', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    listaEscolas = [];
    const escola = new Escola_1.default();
    listaEscolas = yield escola.listaEscolasPorCidade(parseInt(req.params.codmun));
    res.send(listaEscolas);
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
