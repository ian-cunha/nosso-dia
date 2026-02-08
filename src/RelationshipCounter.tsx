/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

// Certifique-se de que as imagens existem ou ajuste os nomes
import photo1 from './assets/1.jpeg';
import photo2 from './assets/2.jpeg';
import photo3 from './assets/3.jpeg';

const RelationshipCounter: React.FC = () => {
    const [months, setMonths] = useState<number>(0);
    const [daysUntilNextMonth, setDaysUntilNextMonth] = useState<number>(0);

    // Estado para os motivos de amar
    const [reasonIndex, setReasonIndex] = useState(0);

    const startDate = new Date('2024-07-06');

    // Lista de motivos - EDITE AQUI COM SUAS FRASES PESSOAIS!
    const reasons = [
        "Te amo pelo seu sorriso que ilumina meu dia.",
        "Te amo porque você é minha melhor amiga.",
        "Te amo pelo jeito que a gente se entende.",
        "Te amo porque você me faz querer ser melhor.",
        "Te amo por cada momento que construímos.",
        "Te amo simplesmente por ser você."
    ];

    const nextReason = () => {
        setReasonIndex((prev) => (prev + 1) % reasons.length);
    };

    useEffect(() => {
        const calculateTime = () => {
            const today = new Date();
            let monthsDiff = today.getMonth() - startDate.getMonth() + (today.getFullYear() - startDate.getFullYear()) * 12;
            monthsDiff += 1;
            if (today.getDate() < startDate.getDate()) monthsDiff--;
            setMonths(Math.max(0, monthsDiff));

            const startDay = startDate.getDate();
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
            setDaysUntilNextMonth(Math.max(0, Math.floor(timeDiff / 86400000)));
        };

        calculateTime();
        const interval = setInterval(calculateTime, 86400000);
        return () => clearInterval(interval);
    }, [startDate]);

    return (
        <div className="counter-container">
            <h1 className="title">Nosso Tempo Juntos</h1>

            <div className="timer-grid">
                <div className="timer-box">
                    <span className="number">{months}</span>
                    <span className="label">Meses</span>
                </div>
                <div className="separator">e</div>
                <div className="timer-box">
                    <span className="number">{daysUntilNextMonth}</span>
                    <span className="label">Dias</span>
                </div>
            </div>

            {/* Galeria Estilo Scrapbook */}
            <div className="mini-gallery">
                <div className="photo-frame left-tilt">
                    <img src={photo1} alt="Nós" />
                </div>
                <div className="photo-frame center-focus">
                    <img src={photo2} alt="Nós" />
                </div>
                <div className="photo-frame right-tilt">
                    <img src={photo3} alt="Nós" />
                </div>
            </div>

            {/* Área Interativa de Motivos */}
            <div className="message-box" onClick={nextReason}>
                <p className="click-hint">Toque aqui ❤️</p>
                <p key={reasonIndex} className="fade-in-text">
                    "{reasons[reasonIndex]}"
                </p>
            </div>

            <p className="love-note">Te amo! <span className="heart-beat">💖</span></p>
        </div>
    );
};

export default RelationshipCounter;