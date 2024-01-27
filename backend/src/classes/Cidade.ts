class Cidade {
    CodMun: number = 0;
    Nome: string = '';
    Uf: string = '';

    constructor(
        //uf: string,
        //codMun: number,
        //nome: string
    ) {
        //this.Uf = uf;
        //this.CodMun = codMun;
        //this.Nome = nome;
    }

    async listaCidadesPoruf(uf: string): Promise<Cidade[]> {
        // create and instantiate an object of Cidade
        var dadosCidade: Cidade;
        var listaCidades: Cidade[] = [];

        try {
            const response = await fetch(`http://educacao.dadosabertosbr.org/api/cidades/${uf}`);
            const data = await response.json();

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

        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

export default Cidade