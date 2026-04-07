import React, { useState, useEffect } from 'react';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = new Date(targetDate).getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-3xl md:text-5xl font-serif text-primary">{value}</span>
      <span className="text-[10px] uppercase tracking-widest text-secondary/60 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center items-center py-8">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div className="h-8 w-[1px] bg-primary/20 self-center mt-[-10px]" />
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="h-8 w-[1px] bg-primary/20 self-center mt-[-10px]" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="h-8 w-[1px] bg-primary/20 self-center mt-[-10px]" />
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
};

export default Countdown;
