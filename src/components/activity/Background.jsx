// src/components/BackgroundAnimation.jsx

import React, { useEffect, useRef } from 'react';

export function BackgroundAnimation() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Ajustar el tamaño del canvas según la resolución del dispositivo
        const resizeCanvas = () => {
            canvas.width = window.innerWidth * window.devicePixelRatio;
            canvas.height = window.innerHeight * window.devicePixelRatio;
            context.scale(window.devicePixelRatio, window.devicePixelRatio); // Escalar el contexto
        };

        resizeCanvas();

        const balls = [];
        const numBalls = 30;

        for (let i = 0; i < numBalls; i++) {
            balls.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 5 + 2, // Cambiar el tamaño de las bolitas (pequeñas)
                dx: Math.random() * 2 - 1,
                dy: Math.random() * 2 - 1,
            });
        }

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                context.beginPath();
                context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                context.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Cambiar el color a negro con un poco de transparencia
                context.fill();
                context.closePath();

                ball.x += ball.dx;
                ball.y += ball.dy;

                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.dx *= -1;
                }
                if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                    ball.dy *= -1;
                }
            });
            requestAnimationFrame(draw);
        };

        draw();

        // Manejar el redimensionamiento de la ventana
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(draw);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
    );
}
