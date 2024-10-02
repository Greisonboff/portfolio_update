import Link_header from "./LinkHeader";
import ToggleTheme from "../toggle/ToggleTheme";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseSquare } from "react-icons/ai";
import LogoImg from "../logo/Logo";
import { useState } from "react";

export default function Header() {
  const [iconMenu, setIconMenu] = useState(false);

  const ativaMenu = () => {
    const element = document.querySelector(".menu-links").classList;
    element.toggle("hidden");
    element.toggle("flex");
    iconMenu == false ? setIconMenu(true) : setIconMenu(false);
  };

  return (
    <div className="flex justify-between sm:justify-center align-baseline my-4 h-8 border-b-2 dark:border-slate-200 border-slate-800 pb-10">
      <div className="mx-6 sm:mx-3 h-8 relative sm:hidden">
        {iconMenu != true ? (
          <GiHamburgerMenu
            className="dark:text-gray-100 h-6 w-6 sm:hidden"
            onClick={ativaMenu}
          />
        ) : (
          <AiOutlineCloseSquare
            className="dark:text-gray-100 h-6 w-6 sm:hidden"
            onClick={ativaMenu}
          />
        )}
      </div>
      <LogoImg />
      <div className="hidden sm:flex absolute sm:relative left-0 z-10 bg-zinc-100 dark:bg-zinc-800 flex-col sm:flex-row border-[1px] border-solid border-black rounded rounded-tl-none translate-y-10 sm:border-none sm:translate-y-0 menu-links">
        <Link_header fechaMenu={ativaMenu} caminho="/" texto="Home" />
        <Link_header
          fechaMenu={ativaMenu}
          caminho="/certificado"
          texto="Certificado"
        />
        <Link_header fechaMenu={ativaMenu} caminho="/projeto" texto="Projeto" />
        <Link_header fechaMenu={ativaMenu} caminho="/listas" texto="Listas" />
        <Link_header fechaMenu={ativaMenu} caminho="/up-img" texto="Imagens" />
      </div>
      <div className="mx-6 sm:mx-3 h-8 relative sm:absolute sm:right-10">
        <ToggleTheme />
      </div>
    </div>
  );
}
