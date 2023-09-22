import { Link } from "react-router-dom";

export default function Link_header({caminho, texto}){
    return <Link className="mx-4 text-base lg:text-lg text-gray-200 hover:text-gray-400 font-semibold hover:animate-pulse" to={caminho}>{texto}</Link>
}