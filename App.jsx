import React, { useState, useEffect } from "react";
import './App.css';

import start from './img/start.png';
import pause from './img/pause.png';
import restart from './img/restart.jpg';

function Cronometro() {
  const [tempo, setTempo] = useState(0);
  const [isRodando, setIsRodando] = useState(false);

  useEffect(() => {
    let intervalo;

    if (isRodando) {
      intervalo = setInterval(() => {
        setTempo(tempo => tempo + 1); // atualiza a cada 1 segundo
      }, 10);
    } else if (!isRodando && tempo !== 0) {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [isRodando]);

  const formatarTempo = (tempo) => {
    const horas = Math.floor(tempo / 360000);
    const minutos = Math.floor((tempo %  360000) / 6000);
    const segundos = Math.floor((tempo % 6000) / 100);
    const milisegundos = tempo % 100;

    return `
    ${horas.toString().padStart(2, '0')}:
    ${minutos.toString().padStart(2, '0')}:
    ${segundos.toString().padStart(2, '0')};
    ${milisegundos.toString().padStart(2, '0')}
    `
  };

  const handleComecar = () => {
    setIsRodando(true);
  };

  const handlePausar = () => {
    setIsRodando(false);
  };

  const handleReiniciar = () => {
    setTempo(0);
    setIsRodando(false);
  };

  return (
    <div>
      <h1>Cronômetro ⏱</h1>
      <p className="tempo">{formatarTempo(tempo)}</p>

      <div className="botoes-container">
        <button className="botao-start" onClick={handleComecar}>
          <img src={start} alt='botão de start' className='start'/>
        </button>
        <button className="botao-pause" onClick={handlePausar}>
          <img src={pause} alt='botão de pause' className='pause'/>
        </button>
        <button className="botao-restart" onClick={handleReiniciar}>
          <img src={restart} alt='botão de restart' className='restart'/>
        </button>
      </div>
    </div>
  );
}

export default Cronometro;