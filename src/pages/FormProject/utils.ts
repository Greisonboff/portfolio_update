import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface IFormData {
  descricao: string;
  link: string;
  linkGit: string;
  nome: string;
  img: string;
  msg: string;
  chave: string;
}

export default async function sendFormProject({
  descricao,
  link,
  linkGit,
  nome,
  img,
  msg,
  chave,
}: IFormData) {
  // Defina as informações do repositório e do arquivo
  const pathToFile = "projetos.json"; // Substitua pelo caminho para o arquivo JSON
  const token = chave; // Substitua pelo seu token de acesso pessoal
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
      return { isValid: true, data: response.data };
    })
    .catch((error) => {
      console.error("Erro:", error);
      return { isValid: false, data: error };
    });

  if (!response.isValid)
    return { isValid: false, message: "Erro tente novamente!" };

  const currentContent = JSON.parse(
    decodeURIComponent(escape(atob(response.data.content)))
  );

  // Modifique o conteúdo do arquivo conforme necessário
  var dataAdd = {
    nome_projeto: nome,
    descricao: descricao,
    link: link,
    link_git: linkGit,
    caminho_imagem: img,
    key: uniqueKey,
  };
  currentContent.unshift(dataAdd);

  // Construa os dados para a atualização
  const newData = {
    message: msg,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(currentContent)))),
    sha: response.data.sha, // Inclua o SHA atual do arquivo
  };

  // Faça uma solicitação PUT para atualizar o arquivo
  const result = await axios
    .put(apiUrl, JSON.stringify(newData), { headers })
    .then((response) => {
      return { isValid: true, message: "Projeto cadastrado com sucesso!" };
    })
    .catch((error) => {
      console.error("Erro:", error);
      return { isValid: false, message: "Erro tente novamente!" };
    });

  return result;
}
