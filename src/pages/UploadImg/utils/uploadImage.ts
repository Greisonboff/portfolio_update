import axios from "axios";
import sendImages from "./sendImages";

// Função para ler um arquivo como Base64 usando Promises
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function send(
  file: File,
  index: number,
  imgTxt: string,
  token: string
) {
  let txt = `${imgTxt}${index}.png`;
  let apiUrl = `${import.meta.env.VITE_API_URL_BASE_IMG}${txt}`;
  const objImagens: Array<{ image: string }> = [];

  try {
    // Lendo o arquivo como Base64
    let content = (await readFileAsDataURL(file)).split(",")[1];
    let data = {
      message: `Adicionar imagem ${imgTxt}${index}`,
      content: content,
    };

    // Enviando requisição PUT
    let response = await axios.put(apiUrl, data, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    objImagens.push({ image: txt });
    if (response.status === 201) {
      return { isValid: true, text: txt };
    } else {
      return { isValid: false, text: txt };
    }
  } catch (error) {
    console.error("Erro ao enviar imagem:", error);
    return {
      isValid: false,
      message: "Erro ao tentar enviar a imagem. Tente novamente!",
    };
  }
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async function uploadImage({
  imgTxt,
  token,
  fileInput,
}: {
  imgTxt: string;
  token: string;
  fileInput: File[];
}) {
  const files = Array.from(fileInput);

  if (files.length === 0) {
    return {
      isValid: false,
      message: "Selecione pelo menos uma imagem para enviar.",
    };
  }

  try {
    const promises = files?.map(async (file, index) => {
      await delay(1000 * index); // Aguardar o delay (1 segundo entre cada requisição)
      return await send(file, index, imgTxt, token);
    });
    const results = await Promise.all(promises);

    const isValid = results.every((result) => result.isValid);

    if (isValid) {
      const objImagens = results.map((result) => result.text);
      const response = await sendImages(token, objImagens, imgTxt);
      if (response.isValid) {
        return {
          isValid: true,
          message: "Imagens enviadas com sucesso.",
        };
      } else {
        return {
          isValid: false,
          message:
            "Erro ao tentar atulaizar a liste de imagens. Tente novamente.",
        };
      }
    } else {
      return {
        isValid: false,
        message: "Erro ao tentar enviar as imagens. Tente novamente.",
      };
    }
  } catch (error) {
    console.error("Erro durante o upload:", error);
    return {
      isValid: false,
      message: "Erro durante o upload. Tente novamente!",
    };
  }
}
