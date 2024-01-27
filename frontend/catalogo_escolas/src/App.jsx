import { useEffect, useState } from "react";
import "./App.css";

const url = "http://localhost:8080/escolas";
var selectedUf = "";

function App() {
  const [urlSufixo, setUrlSufixo] = useState("");
  
  const [municipio, setMunicipio] = useState("");
  const [escolas, setEscolas] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  
  // carrega a lista de municípios do estado selecionado
  const handleUfChange = async (event) => {
    try {
      // selectedUf = event.target.value;

      let uf = event.target.value;
      let newUrlSufixo = `${url}/cidades/${uf}`;
      setUrlSufixo(newUrlSufixo.toString());

      let response = await fetch(newUrlSufixo);
      let data = await response.json();
      setMunicipio(data);

      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // lista as escolas do muncipio selecionado
  const handleMunicipioChange = async (event) => {
    try {
      let selectedMunicipio = event.target.value;

      let newUrlSufixo = `${url}/municipioescolas/${selectedMunicipio}`;
      setUrlSufixo(newUrlSufixo);

      let response = await fetch(newUrlSufixo);
      let data = await response.json();        
      
      setEscolas(data);

      setShow(true);
      setLoading(false);

      return data;
    } catch (error) {
      console.error("An error occurred:", error);
    } 

  };

  // useEffect(() => {
  //   handleUfChange(selectedUf);
  // },[])

  return (
    <>
      <h2>Selecione o Estado</h2>
      {/* lista os municípios selecionando o estado */}
      <select onChange={handleUfChange}>
        <option value="">Selecione o estado</option>
        <option value="AC">Acre</option>
        <option value="AL">Alagoas</option>
        <option value="AP">Amapa</option>
        <option value="AM">Amazonas</option>
        <option value="BA">Bahia</option>
        <option value="CE">Ceara</option>
        <option value="DF">Distrito Federal</option>
        <option value="ES">Espírito Santo</option>
        <option value="GO">Goiás</option>
        <option value="MA">Maranhão</option>
        <option value="MT">Mato Grosso</option>
        <option value="MS">Mato Grosso do Sul</option>
        <option value="MG">Minas Gerais</option>
        <option value="PA">Para</option>
        <option value="PB">Paraiba</option>
        <option value="PR">Parana</option>
        <option value="PE">Pernambuco</option>
        <option value="PI">Piaú</option>
        <option value="RJ">Rio de Janeiro</option>
        <option value="RN">Rio Grande do Norte</option>
        <option value="RS">Rio Grande do Sul</option>
        <option value="RO">Rondônia</option>
        <option value="RR">Roraima</option>
        <option value="SC">Santa Catarina</option>
        <option value="SP">São Paulo</option>
        <option value="SE">Sergipe</option>
        <option value="TO">Tocantins</option>
      </select>

      <h2>Selecione o Município</h2>
      {/* lista os municípios do estado selecionado para o elemento Select */}
      <select
        id="selMunicipio"
        key={municipio.CodMun}
        value={municipio.CodMun}
        onChange={handleMunicipioChange}
      >
        <option value="">Selecione</option>
        {Array.isArray(municipio) &&
          municipio.map((municipio) => (
            <option value={municipio.CodMun} key={municipio.CodMun}>
              {municipio.Nome}
            </option>
          ))
        }
      </select>

      {/* lista as escolas do município selecionado */}
      <h2>Escolas</h2>
      {/* somente o nome da escola */}
      <table>
        <thead>
          <tr>
            <th>Nome da Escola</th>
          </tr>
        </thead>
        {Array.isArray(escolas) &&
          escolas.map((escola) => (
            <tbody key={escola.cod} value={escola.cod}>
              <tr>
                <td>{escola.nome}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </>
  );
}

export default App;
