import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface SendDataCertificate {
  link: string;
  categoria: string;
  nome: string;
  msg: string;
  token: string;
}

export async function sendDataCertificate({
  categoria,
  link,
  nome,
  msg,
  token,
}: SendDataCertificate) {
  try {
    // Defina as informações do repositório e do arquivo
    const pathToFile = "certificate.json"; // Substitua pelo caminho para o arquivo JSON
    const uniqueKey = uuidv4();

    // Construa a URL da API do GitHub
    const apiUrl = `${import.meta.env.VITE_API_URL_BASE}${pathToFile}`;

    const headers = {
      Authorization: `token ${token}`,
      "Content-Type": "application/json;charset=UTF-8", // Exemplo de cabeçalho de tipo de conteúdo
      // Outros cabeçalhos personalizados, se necessário
    };

    // Objeto de configuração da requisição
    const config = {
      headers: headers,
      // Outras opções de configuração, como method, data, params, etc.
    };

    const response = await axios
      .get(apiUrl, config)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Erro:", error);
        return null;
      });

    const currentContent = JSON.parse(
      decodeURIComponent(escape(atob(response?.data.content)))
    );
    // Modifique o conteúdo do arquivo conforme necessário
    var dataAdd = {
      categoria: categoria,
      link: link,
      nome_curso: nome,
      key: uniqueKey,
    };
    currentContent.unshift(dataAdd);

    // Construa os dados para a atualização

    const newData = {
      message: msg,
      content: btoa(
        unescape(encodeURIComponent(JSON.stringify(currentContent)))
      ),
      sha: response.data.sha, // Inclua o SHA atual do arquivo
    };

    // Faça uma solicitação PUT para atualizar o arquivo
    const result = await axios
      .put(apiUrl, JSON.stringify(newData), { headers })
      .then((response) => {
        return { message: "Operação concluída com sucesso", isValid: true };
      })
      .catch((error) => {
        return { message: "Erro na operação", isValid: false };
        console.error("Erro:", error);
      });
    return result;
  } catch (error) {
    return { message: "Erro na operação", isValid: false };
    console.error("Erro:", error);
  }
}
