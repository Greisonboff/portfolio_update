import { useState } from "react";
import Botao from "../../components/Botao";
import InputElement from "../../components/inputs/InputElement";
import { useGlobalStore } from "../../store/useGlobalStore";
import ModalEdit from "./components/ModalEditar";
import { useQuery } from "@tanstack/react-query";
import { deletData } from "./services/deletData";
import ModalExcluir from "./components/ModalExcluir";
import { queryClient } from "../../main";
import { Formik, Form } from "formik";
import { getData } from "./services/getData";

interface CustomListProps {
  label?: string;
  description?: string;
}
export default function Listas() {
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [ativador, setAtivador] = useState("");

  const { chave, setChave, setEditItemModal, setListType, setOpenDeletModal } =
    useGlobalStore();

  const { data, isLoading } = useQuery({
    queryKey: ["getListings", chave, ativador],
    queryFn: () => getData(chave, ativador),

    enabled: isQueryEnabled,
  });

  const handleSubmit = (values) => {
    setAtivador(event?.submitter?.innerText);
    setChave(values.key);
    setIsQueryEnabled(true);
  };

  const editar = (item) => {
    setEditItemModal(item);
    setListType(
      ativador === "Listar certificados" ? "certificate" : "projetos"
    );
  };

  const excluir = (item) => {
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
      <Formik
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        initialValues={{ key: chave }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="break-all flex justify-center gap-3">
              <Botao
                loading={isLoading}
                disabled={isLoading}
                tipo="submit"
                text="Listar certificados"
              />
              <Botao
                loading={isLoading}
                disabled={isLoading}
                tipo="submit"
                text="Listar projetos"
              />
            </div>
            <div className="break-all flex flex-col justify-center">
              <InputElement
                valor={values.key}
                change={handleChange}
                name="key"
                type="text"
                placeholder="Chave de acesso"
              />
            </div>
          </Form>
        )}
      </Formik>
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
                <Botao
                  className="w-[50%]"
                  click={() => excluir(item)}
                  text="Excluir"
                  disabled={isLoading}
                />
                <Botao
                  className="w-[50%]"
                  click={() => editar(item)}
                  text="Editar"
                  disabled={isLoading}
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

function CustomList({ label, description }: CustomListProps) {
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
