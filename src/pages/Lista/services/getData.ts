import axios from "axios";

export async function getData(chave, ativador) {
  try {
    const pathToFile =
      ativador === "Listar certificados" ? `certificate.json` : "projetos.json";
    const token = chave;

    const apiUrl = `${import.meta.env.VITE_API_URL_BASE}${pathToFile}`;
    const headers = {
      Authorization: `token ${token}`,
      "Content-Type": "application/json;charset=UTF-8",
    };

    const config = {
      headers: headers,
    };

    const response = await axios.get(apiUrl, config);

    if (!response) return null;
    const currentContent = JSON.parse(
      decodeURIComponent(escape(atob(response.data.content)))
    );

    return currentContent;
  } catch (error) {
    throw new Error(`Erro: ${error.message}`);
  }
}
