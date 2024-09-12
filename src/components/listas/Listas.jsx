import { useState } from "react";
import Botao_navegacao from "../botaoNavegacao/BotaoNavegacao";
import axios from "axios";
import InputElement from "../inputs/InputElement";
import Erro from "../erro/Erro";
import { useStore } from "../../store/useStore";
import ModalEdit from "../Modal";
import { useQuery } from "@tanstack/react-query";

export default function Listas({ dataChave }) {
  const [chave, setChave] = useState(dataChave());
  const [erro, setErro] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [ativador, setAtivador] = useState("");

  const { setEditItemModal, setListType } = useStore();

  const fetchData = async (chave, ativador) => {
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
    const currentContent = JSON.parse(
      decodeURIComponent(escape(atob(response.data.content)))
    );
    console.log("currentContent: ", currentContent);
    return currentContent;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["getListings", chave, ativador],
    queryFn: () => fetchData(chave, ativador),

    enabled: isQueryEnabled,
    onSuccess: (data) => {
      console.log("data in q: ", data);
      localStorage.setItem("chave_de_acesso_github", chave);
    },
    onError: () => {
      ativaErro("Erro ao buscar os dados");
    },
  });
  console.log("data is: ", data);

  const ativaPega = () => {
    setAtivador(event.target.innerText);
    setIsQueryEnabled(true);
  };

  const ativaErro = (e) => {
    setErro(e);

    setTimeout(() => {
      setErro("");
    }, 3000);
  };

  const editar = (item) => {
    setEditItemModal(item);
    setListType(
      ativador === "Listar certificados" ? "certificate" : "projetos"
    );
  };

  return (
    <div className="flex flex-col w-full sm:w-3/5 lg:w-3/5 px-8">
      <div>
        <div className="break-all flex justify-center">
          <Botao_navegacao funcao={ativaPega} text="Listar certificados" />
          <Botao_navegacao funcao={ativaPega} text="Listar projetos" />
        </div>
        <div className="break-all flex flex-col justify-center">
          <InputElement
            valor={chave}
            aoAlterado={(valor) => setChave(valor)}
            type="text"
            placeholder="Chave de acesso"
          />
        </div>
      </div>
      <Erro texto={erro} />
      <div className="break-all">
        {data?.map((item, index) => (
          <div key={index}>
            <ul className="flex flex-col m-1 ">
              <CustomList label="Projeto:" description={item?.nome_projeto} />
              <CustomList label="Descrição:" description={item?.descricao} />
              <CustomList
                label="Link da imagem:"
                description={item?.caminho_imagem}
              />
              <CustomList label="Categoria:" description={item?.categoria} />
              <CustomList
                label="Nome do curso:"
                description={item?.nome_curso}
              />
              <CustomList label="Link:" description={item?.link} />

              <Botao_navegacao funcao={() => editar(item)} text="Editar" />
            </ul>
            <hr />
          </div>
        ))}
      </div>
      <ModalEdit />
    </div>
  );
}

function CustomList({ label, description }) {
  if (!label || !description) {
    return null;
  }
  return (
    <li className=" dark:text-gray-300 text-gray-500 ">
      {label} &nbsp;{" "}
      <span className=" dark:text-white text-slate-950">{description}</span>
    </li>
  );
}
