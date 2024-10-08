import { useEffect } from "react";
import { getDataKey } from "../../../utils/setKeyGit";
import { useGlobalStore } from "../../store/useGlobalStore";

export default function Box({ element }) {
  const ComponenteRecebido = element;

  const { setChave, chave } = useGlobalStore();

  useEffect(() => {
    if (chave == undefined) {
      const chave = getDataKey();
      setChave(chave);
    }
  }, []);

  return (
    <div className="flex-wrap h-screen md:h-screen lg:h-screen flex justify-center p-2">
      {chave != undefined &&
        ComponenteRecebido.map((ComponenteRecebido) => (
          <ComponenteRecebido key={ComponenteRecebido} />
        ))}
    </div>
  );
}
