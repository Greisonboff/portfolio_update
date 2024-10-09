export default function TitleFrom({ titulo }: { titulo: string }) {
  return (
    <h2 className="dark:text-slate-400 text-gray-900 text-center font-semibold text-lg">
      {titulo}
    </h2>
  );
}
