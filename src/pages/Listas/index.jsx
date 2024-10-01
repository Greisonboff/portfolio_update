import { useState } from "react";
import BotaoNavegacao from "../../components/BotaoNavegacao";
import axios from "axios";
import InputElement from "../../components/inputs/InputElement";
import Erro from "../../components/erro/Erro";
import { useGlobalStore } from "../../store/useGlobalStore";
import ModalEdit from "./components/ModalEditar";
import { useQuery } from "@tanstack/react-query";
import { deletData } from "./services/deletData";
import ModalExcluir from "./components/ModalExcluir";
import { queryClient } from "../../main";

export default function Listas({ dataChave }) {
  const [chave, setChave] = useState(dataChave());
  const [erro, setErro] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [ativador, setAtivador] = useState("");

  const { setEditItemModal, setListType, setOpenDeletModal } = useGlobalStore();

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

  const excluir = (item) => {
    console.log("item para excluir: ", item.key);
    const listType =
      ativador === "Listar certificados" ? "certificate" : "projetos";
    setOpenDeletModal({
      isOpen: true,
      calback: async () => {
        await deletData(item.key, listType, () => {
          queryClient.invalidateQueries({ queryKey: ["getListings"] });
          setOpenDeletModal({ isOpen: false, calback: () => {} });
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-full sm:w-3/5 lg:w-3/5 px-8">
      <div>
        <div className="break-all flex justify-center gap-3">
          <BotaoNavegacao funcao={ativaPega} text="Listar certificados" />
          <BotaoNavegacao funcao={ativaPega} text="Listar projetos" />
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
            <ul className="flex flex-col m-1 pt-2">
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
              <div className="w-full flex p-3 gap-3">
                <BotaoNavegacao
                  className="w-[50%]"
                  funcao={() => excluir(item)}
                  text="Excluir"
                />
                <BotaoNavegacao
                  className="w-[50%]"
                  funcao={() => editar(item)}
                  text="Editar"
                />
              </div>
            </ul>
            <hr />
          </div>
        ))}
      </div>
      <ModalEdit />
      <ModalExcluir />
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
