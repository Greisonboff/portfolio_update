import { useState } from "react";
import Botao from "../../components/Botao";
import InputElement from "../../components/InputElement";
import TitleFrom from "../../components/TitleFrom";
import Imagem from "./Imagem";
import { useGlobalStore } from "../../store/useGlobalStore";
import { Formik, Form } from "formik";
import uploadImage from "./utils/uploadImage";

export default function UpImg() {
  const { chave, setChave, setOpenFeedBack } = useGlobalStore();
  const [load, setLoad] = useState<boolean>(false);
  const [imgFiles, setImgFiles] = useState([]);

  const forInitialValues = {
    name: "",
    key: chave,
    fileInput: [],
  };

  const handleSubmit = async (values, resetForm) => {
    setLoad(true);
    const fileInput = document.getElementById("imageInput").files;

    const response = await uploadImage({
      imgTxt: values.name,
      token: values.key,
      fileInput,
    });

    if (response?.isValid) {
      setOpenFeedBack({
        isOpen: true,
        successStatus: true,
        message: response.message,
      });

      setImgFiles([]);
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

  const showImages = () => {
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
      <Formik
        initialValues={forInitialValues}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values, resetForm);
        }}
      >
        {({ values, handleChange }) => (
          <Form className="shadow-black dark:shadow-white shadow flex flex-col w-full sm:w-2/3 bg-transparent p-5 rounded-lg m-2 lg:m-5">
            <TitleFrom titulo={"Carregar imagens"} />
            <label className="dark:bg-zinc-800  font-semibold bg-zinc-400 dark:text-slate-300 text-slate-900 m-6 h-16 w-2/3 mx-auto rounded-md flex justify-center items-center dark:hover:text-gray-400 hover:border-[#000] hover:dark:text-slate-900 dark:hover:bg-zinc-400 hover:bg-zinc-800 hover:text-gray-400">
              <input
                className="hidden"
                onChange={showImages}
                type="file"
                id="imageInput"
                name="image"
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
                <InputElement
                  type="text"
                  valor={values.name}
                  change={handleChange}
                  name="name"
                  placeholder="Nome das imagens"
                />
                <InputElement
                  valor={values.key}
                  change={handleChange}
                  name="key"
                  placeholder="Chave de acesso"
                />
                <div className="pt-4">
                  <Botao
                    loading={load}
                    tipo="submit"
                    className="w-full"
                    text="Salvar"
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </Form>
        )}
      </Formik>
      <div className="h-5 w-full bg-transparent"></div>
    </>
  );
}
