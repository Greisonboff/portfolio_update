import LabelInput from "../LabelInput";

interface Prop {
  placeholder: string;
  aoAlterado: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  valor: string;
}

export default function Textarea({ placeholder, aoAlterado, valor }) {
  const aoDigitado = (event) => {
    aoAlterado(event.target.value);
  };

  return (
    <>
      <LabelInput texto={placeholder} />
      <textarea
        className=" dark:bg-zinc-700 dark:placeholder-slate-200 dark:text-white placeholder-slate-600 bg-slate-200 outline-none p-2 rounded-md font-semibold h-56 dark:border-0 border-slate-950 border-solid border-2    "
        onChange={aoDigitado}
        value={valor}
        required
        placeholder={placeholder}
      ></textarea>
    </>
  );
}
