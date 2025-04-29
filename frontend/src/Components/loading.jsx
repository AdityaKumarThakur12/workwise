import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const TrainLoading = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const steps = 1000;
    const particles = [];

   
    const path = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = t * width;
      const y = height / 2 + Math.sin(t * Math.PI) * 100;
      path.push({ x, y });
    }

   
    const secondPath = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = width - t * width;
      const y = height * 0.75 + Math.cos(t * Math.PI) * 80;
      secondPath.push({ x, y });
    }

    const getAngle = (p1, p2) => {
      if (!p1 || !p2) return 0;
      return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    };

    let index1 = 0; 
    let index2 = 0; 

    const createParticle = (x, y) => {
      const particle = {
        x,
        y,
        radius: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 3 + 1,
        direction: Math.random() * Math.PI * 2,
        lifetime: Math.random() * 100 + 100,
      };
      particles.push(particle);
    };

    const drawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        if (particle.lifetime <= 0) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        particle.lifetime -= 1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      }
    };

    const drawTrain = (ctx, path, index, colorMain, colorCoach) => {
      for (let i = 0; i <= 5; i++) {
        const coachIndex = (Math.floor(index - i * 20 + path.length) % path.length);
        const pos = path[coachIndex];
        const next = path[(coachIndex + 1) % path.length];

        const angle = Math.atan2(next.y - pos.y, next.x - pos.x);

        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(angle);
        ctx.fillStyle = i === 0 ? colorMain : colorCoach;
        ctx.fillRect(-35, -20, 70, 40);
        ctx.restore();
      }
    };

    const draw = () => {
      ctx.fillStyle = '#101010';
      ctx.fillRect(0, 0, width, height);

     
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y + 25);
      for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y + 25);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 10;
      ctx.shadowColor = '#ff00ff';
      ctx.shadowBlur = 20;
      ctx.stroke();


      createParticle(path[Math.floor(index1 % path.length)].x, path[Math.floor(index1 % path.length)].y);

      drawParticles(); 

     
      drawTrain(ctx, path, index1, '#ff00ff', '#9400d3');

      index1 = (index1 + 2) % path.length;
      index2 = (index2 + 1.5) % secondPath.length;

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <motion.div
      className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-900 text-white relative overflow-hidden overflow-x-hidden"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <motion.h1
        className="absolute top-10 text-5xl font-extrabold z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500"
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        🚄 Journey of Wonders - The Ride Awaits!
      </motion.h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={window.innerHeight}
        className="rounded-4xl w-[80%] shadow-lg border-gray-700"
      />
    </motion.div>
  );
};

export default TrainLoading;
