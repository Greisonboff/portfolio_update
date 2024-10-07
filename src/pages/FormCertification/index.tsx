import { useEffect, useRef, useState } from "react";
import InputElement from "../../components/inputs/InputElement";
import TituloForm from "../../components/titleFrom/TituloFrom";
import { useGlobalStore } from "../../store/useGlobalStore";
import Botao from "../../components/Botao";
import { useQuery } from "@tanstack/react-query";
import { SendDataCertificate, sendDataCertificate } from "./utils";

export default function FormCertification() {
  const { setOpenFeedBack, chave, setChave } = useGlobalStore();
  const [key, setKey] = useState(chave);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [sendData, setSendData] = useState<SendDataCertificate>();

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["sendDataCertificate", sendData],
    queryFn: () => sendDataCertificate(sendData),

    enabled: isQueryEnabled,
  });

  useEffect(() => {
    if (isSuccess) {
      setOpenFeedBack({
        isOpen: true,
        message: data.message,
        successStatus: data.isValid,
      });
    }
  }, [isSuccess]);

  const handleSubmit = () => {
    event.preventDefault();

    setChave(event.target[4].value.trim());

    setSendData({
      categoria: event.target[0].value.trim(),
      link: event.target[1].value.trim(),
      nome: event.target[2].value.trim(),
      msg: event.target[3].value.trim(),
      token: key.trim(),
    });

    setIsQueryEnabled(true);

    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
    event.target[3].value = "";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-black dark:shadow-white shadow flex flex-col sm:h-[90%] h-min lg:h-[90%] lg:w-1/2 sm:w-1/2 w-auto bg-transparent p-5 rounded-lg m-2 lg:m-5"
    >
      <TituloForm titulo={"Cadastrar nova certificação"} />
      <InputElement placeholder="Categoria do curso" />
      <InputElement placeholder="Link certificação" />
      <InputElement placeholder="Nome do curso" />
      <InputElement placeholder="Mensegem de atualização da versão" />
      <InputElement
        valor={key}
        aoAlterado={(value) => setKey(value)}
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
    </form>
  );
}
