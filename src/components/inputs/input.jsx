import TituloInput from "../title_input/TituloInput"

export default function Input({ type, placeholder, aoAlterado, valor }) {
    const aoDigitado = (event) => {
        aoAlterado(event.target.value)
    }
    return (
        <>
            <TituloInput texto={placeholder} />
            <input className="p-2 rounded-md" type={type} onChange={aoDigitado} value={valor} required placeholder={placeholder}></input>
        </>
    )
}