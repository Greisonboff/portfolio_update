import { Link } from "react-router-dom";

export default function Link_header({fechaMenu,caminho, texto}){
    return <Link className="mx-6 my-2 sm:mx-4 sm:my-0 flex justify-start align-middle text-base lg:text-lg dark:text-slate-300 text-gray-900 hover:text-gray-400 font-semibold hover:animate-pulse" to={caminho} onClick={fechaMenu}>{texto}</Link>
}