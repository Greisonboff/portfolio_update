import { useEffect, useRef, useState } from "react";
import InputElement from "../../components/InputElement";
import TituloForm from "../../components/titleFrom/TituloFrom";
import { useGlobalStore } from "../../store/useGlobalStore";
import Botao from "../../components/Botao";
import { useQuery } from "@tanstack/react-query";
import { SendDataCertificate, sendDataCertificate } from "./utils";
import { Formik, Form } from "formik";

interface Data {
  isValid: boolean;
  message: string;
  key?: string;
}
export default function FormCertification() {
  const { setOpenFeedBack, chave, setChave } = useGlobalStore();
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [sendData, setSendData] = useState<SendDataCertificate>();

  const { data, isError, isLoading, isSuccess } = useQuery<Data>({
    queryKey: ["sendDataCertificate", sendData],
    queryFn: () => sendDataCertificate(sendData),
    retry: false,

    enabled: isQueryEnabled,
  });

  const forInitialValues = {
    categoria: "",
    link: "",
    nome: "",
    msg: "",
    key: chave,
  };

  useEffect(() => {
    console.log("data: ", data);
    if (isSuccess && data?.isValid) {
      setOpenFeedBack({
        isOpen: true,
        message: data.message,
        successStatus: data.isValid,
      });

      setChave(data.key);
    } else if (isSuccess && !data?.isValid) {
      setOpenFeedBack({
        isOpen: true,
        message: data.message,
        successStatus: false,
      });
    }
  }, [isSuccess]);

  const handleSubmit = (values, resetForm) => {
    setSendData({
      categoria: values.categoria.trim(),
      link: values.link.trim(),
      nome: values.nome.trim(),
      msg: values.msg.trim(),
      token: values.key.trim(),
    });

    setIsQueryEnabled(true);

    resetForm();
  };

  return (
    <Formik
      initialValues={forInitialValues}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values, resetForm);
      }}
    >
      {({ values, handleChange }) => (
        <Form className="shadow-black dark:shadow-white shadow flex flex-col sm:h-[90%] h-min lg:h-[90%] lg:w-1/2 sm:w-1/2 w-auto bg-transparent p-5 rounded-lg m-2 lg:m-5">
          <TituloForm titulo={"Cadastrar nova certificação"} />
          <InputElement
            valor={values.categoria}
            change={handleChange}
            name="categoria"
            placeholder="Categoria do curso"
          />
          <InputElement
            valor={values.link}
            change={handleChange}
            name="link"
            placeholder="Link certificação"
          />
          <InputElement
            valor={values.nome}
            change={handleChange}
            name="nome"
            placeholder="Nome do curso"
          />
          <InputElement
            valor={values.msg}
            change={handleChange}
            name="msg"
            placeholder="Mensegem de atualização da versão"
          />
          <InputElement
            valor={values.key}
            change={handleChange}
            name="key"
            placeholder="Chave de acesso"
          />
          <div className="pt-4">
            <Botao
              text="Salvar"
              loading={isLoading}
              className="w-full"
              tipo="submit"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
