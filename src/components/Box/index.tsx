export default function Box({ element }) {
  const ComponenteRecebido = element;

  return (
    <div className="flex-wrap h-screen md:h-screen lg:h-screen flex justify-center p-2">
      {ComponenteRecebido.map((ComponenteRecebido) => (
        <ComponenteRecebido key={ComponenteRecebido} />
      ))}
    </div>
  );
}
