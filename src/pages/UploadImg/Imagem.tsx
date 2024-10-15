interface Props {
  link: string;
  alt?: string;
}
export default function Imagem({ link, alt = "Imagem" }: Props) {
  return (
    <img
      className="w-[100px] sm:w-[200px] p-1 flex"
      id="imagemExibida"
      src={link}
      alt={alt}
    />
  );
}
