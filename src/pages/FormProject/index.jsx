import { useState } from "react";
import Botao from "../../components/Botao";
import InputElement from "../../components/InputElement";
import TitleFrom from "../../components/TitleFrom";
import Textarea from "../../components/Textarea";
import { Formik, Form } from "formik";
import sendFormProject from "./utils";
import { useGlobalStore } from "../../store/useGlobalStore";

export default function FormProject() {
  const [load, setLoad] = useState(false);

  const { setOpenFeedBack, setChave, chave } = useGlobalStore();

  const forInitialValues = {
    nome: "",
    link: "",
    linkGit: "",
    descricao: "",
    img: "",
    msg: "",
    chave: chave,
  };

  const handleSubmit = async (values, resetForm) => {
    setLoad(true);

    const response = await sendFormProject(values);

    if (response?.isValid) {
      setOpenFeedBack({
        isOpen: true,
        successStatus: true,
        message: response.message,
      });

      setChave(values.chave);
      resetForm();
    }

    if (!response?.isValid) {
      setOpenFeedBack({
        isOpen: true,
        successStatus: false,
        message: response.message,
      });
    }
    setLoad(false);
  };

  return (
    <>
      <Formik
        initialValues={forInitialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({ values, handleChange }) => (
          <Form className="shadow-black dark:shadow-white shadow flex flex-col lg:h-[140%] lg:w-1/2 sm:w-1/2 w-auto bg-transparent p-5 rounded-lg m-2 lg:m-5">
            <TitleFrom titulo={"Cadastrar novo projeto"} />
            <InputElement
              change={handleChange}
              valor={values.nome}
              name="nome"
              placeholder="Nome do projeto"
            />
            <InputElement
              change={handleChange}
              valor={values.link}
              name="link"
              placeholder="Link do projeto"
            />
            <InputElement
              change={handleChange}
              valor={values.linkGit}
              name="linkGit"
              placeholder="Link do github"
            />
            <Textarea
              valor={values.descricao}
              name="descricao"
              change={handleChange}
              placeholder="Descição do projeto"
            />
            <InputElement
              change={handleChange}
              valor={values.img}
              name="img"
              placeholder="Caminho das imagens"
            />
            <InputElement
              change={handleChange}
              valor={values.msg}
              name="msg"
              placeholder="Mensegem de atualização da versão"
            />
            <InputElement
              change={handleChange}
              valor={values.chave}
              name="chave"
              placeholder="Chave de acesso"
            />
            <div className="pt-4">
              <Botao
                loading={load}
                text="Salvar"
                className="w-full"
                tipo="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
      <div className="h-5 w-full bg-transparent"></div>
    </>
  );
}
