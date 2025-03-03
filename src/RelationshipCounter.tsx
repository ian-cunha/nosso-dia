/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const RelationshipCounter: React.FC = () => {
    const [days, setDays] = useState<number>(0);
    const [months, setMonths] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);

    const startDate = new Date('2024-07-06');

    useEffect(() => {
        const calculateTime = () => {
            const today = new Date();
            const timeDiff = today.getTime() - startDate.getTime();

            // Calcula os dias
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            setDays(daysDiff);

            // Calcula os meses
            const monthsDiff = Math.floor(daysDiff / 30);
            setMonths(monthsDiff);

            // Calcula horas, minutos e segundos
            const hoursDiff = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setHours(hoursDiff);
            setMinutes(minutesDiff);
            setSeconds(secondsDiff);
        };

        // Atualiza o contador a cada segundo
        const interval = setInterval(calculateTime, 1000);

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div>
            <h1>❤️ Nosso Tempo Juntos ❤️</h1>
            <p>
                Estamos juntos há: <br />
                <strong>{months}</strong> meses, <strong>{days}</strong> dias,{' '}
                <strong>{hours}</strong> horas, <strong>{minutes}</strong> minutos e{' '}
                <strong>{seconds}</strong> segundos!
            </p>
            <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
                Cada segundo ao seu lado é um momento especial. Te amo! 💖
            </p>
        </div>
    );
};

export default RelationshipCounter;