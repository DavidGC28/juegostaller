import React, { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    const temporizador = setTimeout(() => {
      if (onCerrar) {
        onCerrar();
      }
    }, 3000);

    return () => clearTimeout(temporizador);
  }, [onCerrar]);

  if (!mensaje) return null;

  return (
    <div className="alerta-flotante">
      <span>{mensaje}</span>
    </div>
  );
}

export default AlertaNotificacion;