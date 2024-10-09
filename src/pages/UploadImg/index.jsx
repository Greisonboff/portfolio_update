import { useState } from "react";
import Botao from "../../components/Botao";
import InputElement from "../../components/InputElement";
import TitleFrom from "../../components/TitleFrom";
import axios from "axios";
import Imagem from "./Imagem";
import Loader from "../../components/Loader";
import Status from "../../status/Status";
import { useGlobalStore } from "../../store/useGlobalStore";
import { setDataKey } from "../../../utils/setKeyGit";

export default function UpImg() {
  const { chave, setChave } = useGlobalStore();
  const [load, setLoad] = useState("");
  const [retorno, setRetorno] = useState("");
  const objImagens = [];

  const [imgFiles, setImgFiles] = useState([]);

  const uploadImage = (imgTxt) => {
    event.preventDefault();
    const token = chave;
    const fileInput = document.getElementById("imageInput").files;

    if (fileInput.length === 0) {
      console.log("Selecione pelo menos uma imagem para enviar.");
      setRetorno("Selecione pelo menos uma imagem para enviar.");
      return;
    }

    // Loop sobre cada arquivo selecionado

    //Array.from(fileInput).forEach((file, index) => {
    const send = (file, index, imgTxt) => {
      let txt = imgTxt + index + ".png";
      let apiUrl = `${import.meta.env.VITE_API_URL_BASE_IMG}${txt}`;
      let reader = new FileReader();

      reader.onload = function (event) {
        let content = event.target.result.split(",")[1];
        let data = {
          message: `Adicionar imagem ${imgTxt + index}`,
          content: content,
        };

        axios
          .put(apiUrl, data, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then(function (response) {
            console.log(response.status);
            objImagens.push({ image: txt });
            if (fileInput[index + 1]) {
              send(fileInput[index + 1], index + 1, imgTxt);
            } else {
              setDataKey(token);
              setLoad("");
              setRetorno("Imagens enviadas com sucesso!");
              enviaObJImg(token, objImagens, imgTxt);
            }
          })
          .catch(function (error) {
            // Lida com erros de requisição
            console.error("Erro na requisição:", error);
            setLoad("");
            setRetorno("Erro tente novamente!");
          });
      };

      reader.readAsDataURL(file);
    };
    if (fileInput) {
      send(fileInput[0], 0, imgTxt);
    }
  };

  const enviaObJImg = (chave, objImagens, msg) => {
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

    axios
      .get(apiUrl, config)
      .then((response) => {
        const currentContent = JSON.parse(
          decodeURIComponent(escape(atob(response.data.content)))
        );

        objImagens.map((e) => {
          currentContent.unshift(e);
        });

        // Construa os dados para a atualização
        const newData = {
          message: msg,
          content: btoa(
            unescape(encodeURIComponent(JSON.stringify(currentContent)))
          ),
          sha: response.data.sha, // Inclua o SHA atual do arquivo
        };

        // Faça uma solicitação PUT para atualizar o arquivo

        axios
          .put(apiUrl, JSON.stringify(newData), { headers })
          .then((response) => {
            setLoad();
            setRetorno("Objeto de imagens atualizado com sucesso!");
            localStorage.setItem("chave_de_acesso_github", token);
          })
          .catch((error) => {
            setLoad();
            setRetorno("Erro tente novamente!");
            console.error("Erro:", error);
          });
      })
      .catch((error) => {
        setLoad();
        setRetorno("Erro tente novamente!");
        console.error("Erro:", error);
      });
  };

  const salvarInfoProjeto = () => {
    setLoad(true);
    event.preventDefault();
    setChave(event.target[2].value);
    uploadImage(event.target[1].value);
    setImgFiles([]);
  };

  const mostraImagens = () => {
    const files = event.target.files;
    var fileGrup = [];
    for (let file of files) {
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          fileGrup.push(event.target.result);
          if (fileGrup.length === files.length) {
            setImgFiles(fileGrup);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={salvarInfoProjeto}
        className="shadow-black dark:shadow-white shadow flex flex-col w-full sm:w-2/3 bg-transparent p-5 rounded-lg m-2 lg:m-5"
      >
        <TitleFrom titulo={"Carregar imagens"} />
        <label className="dark:bg-zinc-800 font-semibold bg-zinc-400 dark:text-slate-300 text-slate-900 m-6 h-16 w-2/3 mx-auto rounded-md flex justify-center items-center">
          <input
            className="hidden"
            onChange={mostraImagens}
            type="file"
            id="imageInput"
            accept="image/*"
            multiple
          ></input>
          Adicionar imagens
        </label>
        <div className="flex flex-wrap justify-center">
          {imgFiles.map((imagem, index) => (
            <Imagem key={index} link={imagem} alt={`Imagem ${index}`} />
          ))}
        </div>
        {imgFiles.length > 0 ? (
          <>
            <InputElement type="text" placeholder="Nome das imagens" />
            <InputElement
              valor={chave}
              type="text"
              placeholder="Chave de acesso"
            />
            <div className="pt-4">
              <Botao tipo="submit" className="w-full" text="Salvar" />
            </div>
          </>
        ) : (
          ""
        )}
        {load == true ? <Loader /> : ""}
        {retorno != "" ? <Status estado={setRetorno} retorno={retorno} /> : ""}
      </form>
      <div className="h-5 w-full bg-transparent"></div>
    </>
  );
}
