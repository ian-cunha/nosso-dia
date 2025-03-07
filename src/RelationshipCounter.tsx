/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

const RelationshipCounter: React.FC = () => {
    const [months, setMonths] = useState<number>(0);
    const [daysUntilNextMonth, setDaysUntilNextMonth] = useState<number>(0);

    const startDate = new Date('2024-07-06');

    useEffect(() => {
        const calculateTime = () => {
            const today = new Date();

            // Cálculo dos meses, contando o mês inicial como 1
            let monthsDiff = today.getMonth() - startDate.getMonth() + (today.getFullYear() - startDate.getFullYear()) * 12;
            monthsDiff += 1; // Adiciona 1 para contar o mês inicial (junho de 2024) como 1
            if (today.getDate() < startDate.getDate()) {
                monthsDiff--; // Subtrai 1 se ainda não passou o dia 6
            }
            setMonths(Math.max(0, monthsDiff));

            // Cálculo dos dias até o próximo dia 6
            const startDay = startDate.getDate(); // Dia 6
            const currentDay = today.getDate();

            let nextAnniversaryMonth = today.getMonth();
            let nextAnniversaryYear = today.getFullYear();

            if (currentDay >= startDay) {
                nextAnniversaryMonth += 1;
                if (nextAnniversaryMonth > 11) {
                    nextAnniversaryMonth = 0;
                    nextAnniversaryYear += 1;
                }
            }

            const nextAnniversary = new Date(nextAnniversaryYear, nextAnniversaryMonth, startDay);
            const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const nextAnniversaryMidnight = new Date(nextAnniversary.getFullYear(), nextAnniversary.getMonth(), nextAnniversary.getDate());

            const timeDiff = nextAnniversaryMidnight.getTime() - todayMidnight.getTime();
            const daysLeft = Math.floor(timeDiff / 86400000);

            setDaysUntilNextMonth(Math.max(0, daysLeft));
        };

        calculateTime();
        const interval = setInterval(calculateTime, 86400000);

        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div>
            <h1>❤️ Nosso Tempo Juntos</h1>
            <p>
                Estamos juntos há: <br />
                <strong>{months}</strong> meses, e faltam <strong>{daysUntilNextMonth}</strong> dias para o próximo mês!
            </p>
            <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>
                Cada segundo ao seu lado é um momento especial. Te amo! 💖
            </p>
        </div>
    );
};

export default RelationshipCounter;