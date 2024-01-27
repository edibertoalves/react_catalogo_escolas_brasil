import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import Cidade from "./classes/Cidade";
import Escola from "./classes/Escola";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
var listaCidades: Cidade[] = [];
var listaEscolas: Escola[] = [];

app.use(cors({
  origin: '*', // ou especifique o domínio permitido
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor em execução");
});

// obtem a lista de cidades, passando o UF como parametro
app.get('/escolas/cidades/:uf', async (req: Request, res: Response) => {
  
  // instancia o array que servirá com uma lista de cidades por UF
  listaCidades = [];

  // faz uma busca para retornar todas as cidades, passando o estado como parametro
  const cidade = new Cidade()
  listaCidades = await cidade.listaCidadesPoruf(req.params.uf);
  
  res.send(listaCidades);
})


// faz uma busca para retornar todas as cidades, passando o estado como parametro
app.get('/escolas/municipioescolas/:codmun', async (req: Request, res: Response) => {
  listaEscolas = [];

  const escola = new Escola();
  listaEscolas = await escola.listaEscolasPorCidade(parseInt(req.params.codmun));

  res.send(listaEscolas);
})


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


