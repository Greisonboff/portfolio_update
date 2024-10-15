import axios from "axios";

export default async function sendImages(chave, objImagens, msg) {
  // Defina as informações do repositório e do arquivo
  const pathToFile = "objImagens.json"; // Substitua pelo caminho para o arquivo JSON
  const token = chave; // Substitua pelo seu token de acesso pessoal

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
      return { mesage: "Erro tente novamente!", isValid: false };
    });

  if (!response) {
    return { mesage: "Erro tente novamente!", isValid: false };
  }
  const currentContent = JSON.parse(
    decodeURIComponent(escape(atob(response.data.content)))
  );

  objImagens.map((e) => {
    currentContent.unshift(e);
  });

  // Construa os dados para a atualização
  const newData = {
    message: msg,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent)))),
    sha: response.data.sha, // Inclua o SHA atual do arquivo
  };

  const result = await axios
    .put(apiUrl, JSON.stringify(newData), { headers })
    .then((response) => {
      return {
        mesage: "Objeto de imagens atualizado com sucesso!",
        isValid: true,
      };
    })
    .catch((error) => {
      console.error("Erro:", error);
      return { mesage: "Erro tente novamente!", isValid: false };
    });

  return result;
}
