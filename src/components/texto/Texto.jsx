import TituloInput from "../title_input/TituloInput"

export default function Texto({ type, placeholder, aoAlterado, valor }) {
    const aoDigitado = (event) => {
        aoAlterado(event.target.value)
    }

    return (
        <>
            <TituloInput texto={placeholder} />
            <textarea className="outline-none p-2 rounded-md font-semibold h-56" type={type} onChange={aoDigitado} value={valor} required placeholder={placeholder}></textarea>
        </>
    )
}