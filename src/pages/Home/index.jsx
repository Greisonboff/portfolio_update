import imagemFundo from "../../imagens/hello-world-unscreen.gif";
export default function Home() {
  return (
    <div className="absolute sm:relative sm:rounded-[3%] sm:m-6 bg-[#000] bg-center w-full h-full bg-no-repeat flex justify-center">
      <h1 className="font-['Pixel_font'] font-thin text-[30px] sm:text-[50px] lg:text-4 text-gray-300 p-8 lg:pt-10">
        Bem-vindo dev
      </h1>
      <img
        className="w-[80vw] mt-[15%] sm:mt-0 sm:w-[50vw] flex absolute"
        src={imagemFundo}
      />
    </div>
  );
}
