import Cidade from "./Cidade";

class Escola {
  AnoCenso: number = 0;
  Codigo: number = 0;
  Nome: string = "";
  CodCidade: number = 0;
  Cidade: string = "";
  Estado: string = "";
  Regiao: string = "";
  SituacaoFuncionamento: string = "";
  DependenciaAdministrativa: string = "";
  IdebAI: number = 0;
  IdebAF: number = 0;
  EnemMediaGeral: number = 0;
  SituacaoFuncionamentoTxt: string = "";
  DependenciaAdministrativaTxt: string = "";

  constructor() {

  }

  async listaEscolasPorCidade(codMun: number): Promise<Escola[]> {
    const response = await fetch(`http://educacao.dadosabertosbr.org/api/escolas/buscaavancada?cidade=${codMun}`);
    const data = await response.json();

    let escolas: Escola[] = data[1].map((item: any) => {
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
  }
}

export default Escola