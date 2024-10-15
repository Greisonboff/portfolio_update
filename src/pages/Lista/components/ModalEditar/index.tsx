import * as React from "react";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useGlobalStore } from "../../../../store/useGlobalStore";
import { Button, FormLabel, Input, Textarea } from "@mui/joy";
import { updateData } from "../../services/updateData";
import { queryClient } from "../../../../main";
import Botao from "../../../../components/Botao";

export default function ModalEdit() {
  const { setEditItemModal, item, listType, setOpenFeedBack } =
    useGlobalStore();
  const [load, setLoad] = React.useState<boolean>(false);

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    var data: { name: string; value: string }[] = Array.from(e.target.elements);

    const obj = data.reduce<{ [key: string]: string }>((acc, item) => {
      if (item.value.trim() && item.name) {
        acc[item.name] = item.value;
      }
      return acc;
    }, {});

    const response = await updateData({ data: obj, listType });

    setOpenFeedBack({ isOpen: true, successStatus: response });
    setLoad(false);
    setEditItemModal(null);

    if (response) {
      queryClient.invalidateQueries({ queryKey: ["getListings"] });
    }
  };

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={item !== null}
      onClose={() => setEditItemModal(null)}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: 500, md: 600 },
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
        className="bg-white dark:bg-[#1c1c1c]"
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <form
          onSubmit={handleSubmit}
          className="dark:text-white text-slate-950"
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 1 }}
          >
            Edite as informações
          </Typography>
          <CustomInput
            label="Nome do projeto"
            field="nome_projeto"
            placeholder={item?.nome_projeto}
          />
          <CustomInput
            label="Nome do curso"
            field="nome_curso"
            placeholder={item?.nome_curso}
          />
          <CustomInput
            label="Caminho da imagem"
            field="caminho_imagem"
            placeholder={item?.caminho_imagem}
          />
          <CustomInput
            label="Descrição"
            type="text"
            field="descricao"
            placeholder={item?.descricao}
          />
          <CustomInput label="Link" field="link" placeholder={item?.link} />
          <CustomInput
            label="Link Git"
            field="link_git"
            placeholder={item?.link_git}
          />
          <CustomInput
            label="Categoria"
            field="categoria"
            placeholder={item?.categoria}
          />
          <CustomInput
            label="Key"
            field="key"
            hidden
            placeholder={item?.key}
            value={item?.key}
          />
          <Botao
            tipo="submit"
            loading={load}
            className="w-full !mt-2"
            text="Salvar alterações"
          />
        </form>
      </Sheet>
    </Modal>
  );
}

interface CustomInputProp {
  label: string | undefined;
  placeholder: string | undefined;
  type?: "text";
  field:
    | "caminho_imagem"
    | "descricao"
    | "link"
    | "link_git"
    | "nome_projeto"
    | "categoria"
    | "key"
    | "nome_curso";
  hidden?: boolean;
  value?: string;
}

function CustomInput({
  label,
  placeholder,
  type,
  field,
  hidden,
  value,
}: CustomInputProp) {
  if (!label || !placeholder) {
    return null;
  }
  return (
    <div className={`p-1 ${hidden && "hidden"}`}>
      <FormLabel className="dark:text-white text-slate-950">{label}</FormLabel>
      {type ? (
        <Textarea
          name={field}
          minRows={2}
          maxRows={5}
          size="sm"
          placeholder={placeholder}
          className="dark:bg-zinc-700 dark:placeholder-slate-200 dark:text-white"
        />
      ) : (
        <Input
          name={field}
          size="sm"
          placeholder={placeholder}
          value={value && value}
          className="dark:bg-zinc-700 dark:placeholder-slate-200 dark:text-white"
        />
      )}
    </div>
  );
}
