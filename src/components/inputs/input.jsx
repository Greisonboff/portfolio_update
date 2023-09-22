import TituloInput from "../titleInput/TituloInput"

export default function Input({ type, placeholder, aoAlterado, valor }) {
    const aoDigitado = (event) => {
        aoAlterado(event.target.value)
    }
    return (
        <>
            <TituloInput texto={placeholder} />
            <input className="outline-none p-2 rounded-md bg-slate-200 placeholder-slate-600" type={type} onChange={aoDigitado} value={valor} required placeholder={placeholder}></input>
        </>
    )
}