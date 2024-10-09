export default function LabelInput({ texto }: { texto: string }) {
  return (
    <h3 className=" dark:text-slate-400 text-gray-900 m-2 font-semibold">
      {texto}
    </h3>
  );
}
