import { useState } from "react";
import Botao_navegacao from "../botaoNavegacao/BotaoNavegacao";
import axios from "axios";
import Input from "../inputs/Input";
import Li from "../componentList/Li";
import Erro from "../erro/Erro";

export default function Listas() {
    const [textoCertificados, setTextoCertificados] = useState([]);
    const [textoProjetos, setTextoProjetos] = useState([]);
    const [chave, setChave] = useState('')
    const [erro, setErro] = useState('')

    const pega = (chave, ativador) => {
        // Defina as informações do repositório e do arquivo
        const owner = 'Greisonboff'; // Substitua pelo nome do proprietário do repositório
        const repo = 'data-center'; // Substitua pelo nome do repositório
        const pathToFile = ativador === "Listar certificados" ? 'certificate.json' : 'projetos.json'; // Substitua pelo caminho para o arquivo JSON
        const token = chave; // Substitua pelo seu token de acesso pessoal


        // Construa a URL da API do GitHub
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${pathToFile}`;

        const headers = {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',// Exemplo de cabeçalho de tipo de conteúdo
            // Outros cabeçalhos personalizados, se necessário
        };

        // Objeto de configuração da requisição
        const config = {
            headers: headers,
            // Outras opções de configuração, como method, data, params, etc.
        };

        axios.get(apiUrl, config)
            .then((response) => {
                const currentContent = JSON.parse(decodeURIComponent(escape(atob(response.data.content))));
                if (ativador === "Listar certificados") {
                    setTextoProjetos([])
                    setTextoCertificados(currentContent)
                } else {
                    setTextoCertificados([])
                    setTextoProjetos(currentContent)
                }
            })
            .catch((error) => {
                console.error('Erro:', error);
                setTextoCertificados([])
                setTextoProjetos([])
                ativaErro('Erro ao buscar os dados')
            });
    }

    const ativaPega = () => {
        pega(chave, event.target.innerText);
    }

    const ativaErro = (e) => {
        setErro(e);

        setTimeout(() => {
            setErro('');
        }, 3000);
    }

    return (
        <div className="flex flex-col w-full sm:w-3/5 lg:w-3/5 px-8">
            <div>
                <div className="break-all flex justify-center">
                    <Botao_navegacao funcao={ativaPega} text="Listar certificados" />
                    <Botao_navegacao funcao={ativaPega} text="Listar projetos" />
                </div>
                <div className="break-all flex flex-col justify-center">
                    
                </div>
            </div>
            <Erro texto={erro} />
            <div className="break-all">
                {textoCertificados.map((item, index) =>
                    <>
                        <ul key={index} className="flex flex-col m-1 ">
                            <Li param='Categoria: ' item={item.categoria} />
                            <Li param='Nome do curso: ' item={item.nome_curso} />
                            <Li param='Link: ' item={item.link} />
                        </ul>
                        <hr/>
                    </>
                )}

                {textoProjetos.map((item, index) =>
                    <>
                        <ul key={index} className="flex flex-col m-1 ">
                            <Li param='Projeto:' item={item.nome_projeto} />
                            <Li param='Descrição:' item={item.descricao} />
                            <Li param='Link da imagem:' item={item.caminho_imagem} />
                            <Li param='Link do projeto:' item={item.link} />
                        </ul>
                        <hr/>
                    </>
                )}
            </div>
        </div>
    )
}