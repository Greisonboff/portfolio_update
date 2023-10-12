export default function Box({ element }) {
    const ComponenteRecebido = element;

    const dataChave = () => {
        const chaveLocal = localStorage.getItem('chave_de_acesso_github');
        if (chaveLocal != null) {
            return chaveLocal
        } else {
            return ''
        }
    }

    return (
        <div className="flex-wrap h-screen md:h-screen lg:h-screen flex justify-center p-2">
            {
                ComponenteRecebido.map(ComponenteRecebido => (
                    <ComponenteRecebido dataChave={dataChave} key={ComponenteRecebido} />
                ))
            }
        </div>
    )
}