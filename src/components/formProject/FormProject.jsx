import { useState } from "react";
import Botao from "../components/BotaoNavegacao";
import InputElement from "../inputs/InputElement";
import TituloForm from "../titleFrom/TituloFrom";
import axios from "axios";
import Texto from "../texto/Texto";
import Loader from "../../load/Loader";
import Status from "../../status/Status";
import { v4 as uuidv4 } from "uuid";

export default function FormProject({ dataChave }) {
  const [descricao, setDescricao] = useState("");
  const [link, setLink] = useState("");
  const [linkGit, setLinkGit] = useState("");
  const [nome, setNome] = useState("");
  const [chave, setChave] = useState(dataChave());
  const [msg, setMsg] = useState("");
  const [img, setImg] = useState("");
  const [load, setLoad] = useState("");
  const [retorno, setRetorno] = useState("");

  const envia = (descricao, link, linkGit, nome, img, msg, chave) => {
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

    axios
      .get(apiUrl, config)
      .then((response) => {
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
            setRetorno("Projeto cadastrado com sucesso!");
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
    envia(
      descricao.trim(),
      link.trim(),
      linkGit.trim(),
      nome.trim(),
      img.trim(),
      msg.trim(),
      chave.trim()
    );
    setDescricao("");
    setLink("");
    setLinkGit("");
    setNome("");
    setMsg("");
    setImg("");
  };

  return (
    <>
      <form
        onSubmit={salvarInfoProjeto}
        className="shadow-black dark:shadow-white shadow flex flex-col lg:h-[140%] lg:w-1/2 sm:w-1/2 w-auto bg-transparent p-5 rounded-lg m-2 lg:m-5"
      >
        <TituloForm titulo={"Cadastrar novo projeto"} />
        <InputElement
          valor={nome}
          aoAlterado={(valor) => setNome(valor)}
          type="text"
          placeholder="Nome do projeto"
        />
        <InputElement
          valor={link}
          aoAlterado={(valor) => setLink(valor)}
          type="text"
          placeholder="Link do projeto"
        />
        <InputElement
          valor={linkGit}
          aoAlterado={(valor) => setLinkGit(valor)}
          type="text"
          placeholder="Link do github"
        />
        <Texto
          valor={descricao}
          aoAlterado={(valor) => setDescricao(valor)}
          type="text"
          placeholder="Descição do projeto"
        />
        <InputElement
          valor={img}
          aoAlterado={(valor) => setImg(valor)}
          type="text"
          placeholder="Caminho das imagens"
        />
        <InputElement
          valor={msg}
          aoAlterado={(valor) => setMsg(valor)}
          type="text"
          placeholder="Mensegem de atualização da versão"
        />
        <InputElement
          valor={chave}
          aoAlterado={(valor) => setChave(valor)}
          type="text"
          placeholder="Chave de acesso"
        />
        {load != true &&
        retorno == "" &&
        nome != "" &&
        link != "" &&
        descricao != "" &&
        img != "" &&
        msg != "" &&
        chave != "" ? (
          <Botao texto="Salvar" />
        ) : (
          ""
        )}
        <div className="flex m-auto">
          {load == true ? <Loader /> : ""}
          {retorno != "" ? (
            <Status estado={setRetorno} retorno={retorno} />
          ) : (
            ""
          )}
        </div>
      </form>
      <div className="h-5 w-full bg-transparent"></div>
    </>
  );
}
