import { useState } from "react";
import InputElement from "../../components/inputs/InputElement";
import TituloForm from "../../components/titleFrom/TituloFrom";
import axios from "axios";
import Loader from "../../load/Loader";
import { v4 as uuidv4 } from "uuid";
import { useGlobalStore } from "../../store/useGlobalStore";
import Botao from "../../components/Botao";

export default function Form({ dataChave }) {
  const [categoria, setCategoria] = useState("");
  const [link, setLink] = useState("");
  const [nome, setNome] = useState("");
  const [chave, setChave] = useState(dataChave());
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState("");
  const { setOpenFeedBack } = useGlobalStore();

  const envia = (categoria, link, nome, msg, chave) => {
    // Defina as informações do repositório e do arquivo
    const pathToFile = "certificate.json"; // Substitua pelo caminho para o arquivo JSON
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
        axios
          .put(apiUrl, JSON.stringify(newData), { headers })
          .then(() => {
            setLoad();
            setOpenFeedBack({
              isOpen: true,
              message: "Certificado cadastrado com sucesso!",
              successStatus: true,
            });
            localStorage.setItem("chave_de_acesso_github", token);
          })
          .catch((error) => {
            setLoad();
            setOpenFeedBack({
              isOpen: true,
              successStatus: false,
            });
            console.error("Erro:", error);
          });
      })
      .catch((error) => {
        setLoad();
        setOpenFeedBack({
          isOpen: true,
          successStatus: false,
        });
        console.error("Erro:", error);
      });
  };

  const salvarInfo = () => {
    setLoad(true);
    event.preventDefault();
    envia(categoria.trim(), link.trim(), nome.trim(), msg.trim(), chave.trim());
    setCategoria("");
    setLink("");
    setNome("");
    setMsg("");
  };

  return (
    <form
      onSubmit={salvarInfo}
      className="shadow-black dark:shadow-white shadow flex flex-col sm:h-[90%] h-min lg:h-[90%] lg:w-1/2 sm:w-1/2 w-auto bg-transparent p-5 rounded-lg m-2 lg:m-5"
    >
      <TituloForm titulo={"Cadastrar nova certificação"} />
      <InputElement
        valor={categoria}
        aoAlterado={(valor) => setCategoria(valor)}
        type="text"
        placeholder="Categoria do curso"
      />
      <InputElement
        valor={link}
        aoAlterado={(valor) => setLink(valor)}
        type="text"
        placeholder="Link certificação"
      />
      <InputElement
        valor={nome}
        aoAlterado={(valor) => setNome(valor)}
        type="text"
        placeholder="Nome do curso"
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
      <div className="pt-4">
      {load != true && nome != "" && link != "" && msg != "" && chave != "" ? (
        <Botao text="Salvar" className="w-full" tipo="submit" />
      ) : (
        ""
      )}
      </div>
      <div className="flex m-auto">{load == true ? <Loader /> : ""}</div>
    </form>
  );
}
