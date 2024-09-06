import { useEffect, useRef, useState } from "react"

function App() {
  const [conta, setConta] = useState("")
  const [resultado, setResultado] = useState<number | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculator = () => {
    try {
      if (conta.includes("/")) {
        const [dividendo, divisor] = conta.split("/").map(Number);
        if (divisor === 0) {
          alert("O divisor não pode ser zero.")
          return setResultado(null);
        };
      };
      const calculo = eval(conta);
      setResultado(calculo);
    }
    catch (error) {
      setResultado(null);
      alert("Erro ao calcular, verifique a expressão");
    };
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" && buttonRef.current) {
      buttonRef.current.click();
    };
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-gray-800">
      <div className="border-2 border-blue-700 bg-blue-300 rounded-lg p-4 shadow-2xl shadow-blue-400">
        <div className="flex mb-6">
          <label className="flex text-2xl text-white" htmlFor="input">Calculadora:</label>
        </div>
        <div className="flex">
          <input className="flex border-2 border-black rounded-md p-1"
            type="text" id="input" placeholder="Digite a conta aqui..." value={conta} onChange={(e) => setConta(e.target.value)} />
          <button className="flex border-2 rounded-md border-black bg-blue-500 text-white p-1" ref={buttonRef} onClick={calculator}>Calcular</button>
        </div>
        <div className="flex">
          {resultado !== null && (
            <div className="flex flex-col text-white">
              <div className={`mt-4 text-2xl ${typeof resultado === "string" ? "text-red-500" : ""}`}>
                {typeof resultado === "number" ? `Resultado: ${resultado}` : `Erro: ${resultado}`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App
