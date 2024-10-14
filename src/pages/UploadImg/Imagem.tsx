export default function Imagem({ link }: { link: string }) {
  return (
    <img
      className="w-[100px] sm:w-[200px] p-1 flex"
      id="imagemExibida"
      src={link}
      alt="Imagem"
    ></img>
  );
}
