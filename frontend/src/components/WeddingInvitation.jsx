import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './Countdown';
import EnvelopeIntro from './EnvelopeIntro';
import Sparkles from './Sparkles';
import weddingConfig from '../config';

// Foto do casal: coloque o arquivo couple.jpeg (ou couple.jpg / couple.png)
// em frontend/src/assets/ e ele aparece automaticamente no convite.
// Enquanto não houver foto, é exibido o monograma com as iniciais.
const photoModules = import.meta.glob('../assets/couple.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const coupleImg = Object.values(photoModules)[0] ?? null;

const WeddingInvitation = ({
  names = weddingConfig.names,
  date = weddingConfig.date,
  time = weddingConfig.time,
  location = weddingConfig.location,
  message = weddingConfig.message,
  whatsappNumber = weddingConfig.whatsappNumber
}) => {
  const [showRsvp, setShowRsvp] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Abertura do envelope: mostra a animação na primeira visita da sessão
  const [introDone, setIntroDone] = useState(() => {
    try {
      return sessionStorage.getItem('weddingIntroSeen') === '1';
    } catch {
      return false;
    }
  });

  const handleIntroOpened = () => {
    try {
      sessionStorage.setItem('weddingIntroSeen', '1');
    } catch {
      // sessionStorage indisponível (modo privado) — sem problema
    }
    setIntroDone(true);
  };
  
  // RSVP Form State
  const [formData, setFormData] = useState({
    name: '',
    guests: 0,
    companionNames: '',
    willAttendParty: true,
    willDrinkAlcohol: null // Changed to null for explicit choice
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRsvp = () => {
    setShowRsvp(true);
  };

  const handleSubmitRsvp = (e) => {
    e.preventDefault();
    if (formData.willDrinkAlcohol === null) {
      alert('Por favor, informe se irá consumir bebida alcoólica.');
      return;
    }
    
    // Prepare WhatsApp message
    const messageText = `*Nova Confirmação de Casamento!* 💍\n\n` +
      `*Nome:* ${formData.name}\n` +
      `*Acompanhantes:* ${formData.guests}\n` +
      `${Number(formData.guests) > 0 ? `*Nomes:* ${formData.companionNames}\n` : ''}` +
      `*Vai na festa?* ${formData.willAttendParty ? 'Sim ✅' : 'Não ❌'}\n` +
      `*Consome álcool?* ${formData.willDrinkAlcohol ? 'Sim 🍷' : 'Não 🥤'}`;
    
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setConfirmed(true);
    setShowRsvp(false);
    
    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, '_blank');
  };
  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <EnvelopeIntro
            names={names}
            title={weddingConfig.inviteTitle}
            onOpened={handleIntroOpened}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: introDone ? 1 : 0, scale: introDone ? 1 : 0.98 }}
        animate={introDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="min-h-screen bg-accent flex items-center justify-center p-4 selection:bg-primary selection:text-white relative overflow-hidden"
      >
        {/* Brilhos cintilantes ao fundo do convite */}
        <Sparkles count={12} seed={21} opacity={0.45} />

        {/* Halo suave dourado atrás do cartão */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-[#F2B8A2]/20 blur-3xl" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-xl w-full bg-white shadow-[0_0_50px_rgba(0,0,0,0.03)] border border-primary/20 relative overflow-hidden p-12 md:p-20 text-center"
        >
        {/* Subtle Decorative Border (Code-based) */}
        <div className="absolute inset-4 border border-primary/10 pointer-events-none" />
        <div className="absolute inset-8 border border-primary/5 pointer-events-none" />

        {/* Reflexo dourado que cruza o cartão de tempos em tempos */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, transparent 42%, rgba(233,200,138,0.22) 50%, transparent 58%)',
          }}
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 7, ease: 'easeInOut' }}
        />
        
        {/* Top Decoration */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-[1px] bg-primary/30 self-center" />
          <div className="mx-4 text-primary font-serif italic text-xl uppercase tracking-widest">{names[0][0]} & {names[1][0]}</div>
          <div className="w-12 h-[1px] bg-primary/30 self-center" />
        </div>

        {/* Biblical Quote / Message */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.1 }}
           className="mb-8"
        >
          <p className="text-secondary/40 font-serif italic text-sm px-4">
             "{message}"
          </p>
        </motion.div>

        {/* Hero Image (ou monograma enquanto a foto não for enviada) */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2, duration: 1 }}
           className="mb-8 relative"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto overflow-hidden rounded-full border-4 border-white shadow-xl flex items-center justify-center bg-secondary/5">
            {coupleImg ? (
              <img
                src={coupleImg}
                alt="O Casal"
                style={{ objectPosition: '50% 32%' }}
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
              />
            ) : (
              <div className="text-center px-6">
                <p className="text-primary text-6xl md:text-8xl font-serif leading-none">
                  {names[0][0]} <span className="text-secondary/30 text-4xl md:text-6xl italic">&</span> {names[1][0]}
                </p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 border-[1px] border-primary/20 rounded-full w-[13.5rem] h-[13.5rem] md:w-[17.5rem] md:h-[17.5rem] -m-3 mx-auto pointer-events-none" />
        </motion.div>

        {/* Content */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-secondary tracking-[.3em] uppercase text-xs mb-6 font-sans font-light"
        >
          Convidam para o seu casamento
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-primary text-5xl md:text-7xl font-serif mb-8 leading-tight"
        >
          {names[0]} <br /> 
          <span className="text-3xl md:text-5xl italic font-normal text-secondary/30">&</span> <br /> 
          {names[1]}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="space-y-4"
        >
          <div className="h-[1px] w-24 bg-primary/20 mx-auto" />
          <p className="text-secondary font-serif text-lg md:text-xl italic">
            {date} às {time}
          </p>
          <p className="text-secondary/70 font-sans text-sm tracking-widest uppercase">
            {location}
          </p>
          <a 
            href={weddingConfig.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-[10px] text-primary/60 hover:text-primary uppercase tracking-widest transition-all underline decoration-primary/20 hover:decoration-primary"
          >
            Ver no Mapa
          </a>
          <div className="h-[1px] w-24 bg-primary/20 mx-auto pt-4" />
          
          <Countdown targetDate={weddingConfig.targetDate} />
        </motion.div>

        {/* Footer Interaction */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12"
        >
          {!confirmed ? (
            <button 
              onClick={handleRsvp}
              className="px-8 py-3 bg-secondary text-accent text-xs tracking-widest uppercase font-semibold hover:bg-primary transition-colors duration-500 rounded-sm shadow-lg shadow-secondary/20"
            >
              Confirmar Presença
            </button>
          ) : (
            <div className="text-secondary font-serif italic text-lg animate-pulse">
              Presença Confirmada! ✨
            </div>
          )}
        </motion.div>

        {/* Simple RSVP Modal Modal */}
        <AnimatePresence>
          {showRsvp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-accent p-8 md:p-12 max-w-md w-full rounded-sm shadow-2xl text-center relative border-t-8 border-primary"
              >
                <button 
                  onClick={() => setShowRsvp(false)}
                  className="absolute top-4 right-4 text-secondary/40 hover:text-secondary"
                >
                  ✕
                </button>
                <h2 className="text-secondary font-serif text-3xl mb-6">Confirmação</h2>
                
                <form onSubmit={handleSubmitRsvp} className="text-left space-y-6">
                  {/* Nome */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-secondary/50 mb-2 font-semibold">Seu Nome</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Como podemos te chamar?"
                      className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none text-secondary font-sans transition-all"
                    />
                  </div>

                  {/* Acompanhantes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-secondary/50 mb-2 font-semibold">Qtd. Acompanhantes</label>
                      <input 
                        type="number" 
                        name="guests"
                        min="0"
                        max="10"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none text-secondary font-sans transition-all"
                      />
                    </div>
                    {formData.guests > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <label className="block text-[10px] uppercase tracking-widest text-secondary/50 mb-2 font-semibold">Nome(s)</label>
                        <input 
                          type="text" 
                          name="companionNames"
                          value={formData.companionNames}
                          onChange={handleInputChange}
                          placeholder="Quem virá com você?"
                          className="w-full bg-transparent border-b border-primary/30 py-2 focus:border-primary outline-none text-secondary font-sans transition-all"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Perguntas Adicionais */}
                  <div className="space-y-6 pt-2">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-secondary/50 mb-4 font-semibold text-center italic">Participará da pequena recepção?</label>
                        <div className="flex justify-center space-x-4">
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({...prev, willAttendParty: true}))}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${formData.willAttendParty === true ? 'bg-primary text-white' : 'border border-primary/20 text-primary/60 hover:bg-primary/5'}`}
                            >
                                Sim
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({...prev, willAttendParty: false}))}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${formData.willAttendParty === false ? 'bg-primary text-white' : 'border border-primary/20 text-primary/60 hover:bg-primary/5'}`}
                            >
                                Não
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest text-secondary/50 mb-4 font-semibold text-center italic">Irá consumir bebida alcoólica?</label>
                        <div className="flex justify-center space-x-4">
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({...prev, willDrinkAlcohol: true}))}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${formData.willDrinkAlcohol === true ? 'bg-primary text-white shadow-sm' : 'border border-primary/20 text-primary/60 hover:bg-primary/5'}`}
                            >
                                Sim
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData(prev => ({...prev, willDrinkAlcohol: false}))}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all ${formData.willDrinkAlcohol === false ? 'bg-primary text-white shadow-sm' : 'border border-primary/20 text-primary/60 hover:bg-primary/5'}`}
                            >
                                Não
                            </button>
                        </div>
                        {formData.willDrinkAlcohol === null && (
                            <p className="text-[9px] text-red-400 mt-2 text-center italic">* Selecione uma opção</p>
                        )}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-primary text-white text-xs tracking-[.2em] font-bold uppercase rounded-sm hover:brightness-110 transition-all shadow-lg active:scale-95"
                    >
                      Confirmar Presença
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowRsvp(false)}
                      className="w-full py-3 mt-2 border border-secondary/10 text-secondary/40 text-[10px] tracking-widest uppercase hover:text-secondary transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coded Botanical Decoration (SVG) */}
        <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100">
             <path d="M50 100 C 50 70, 70 50, 100 50" fill="none" stroke="currentColor" className="text-primary" strokeWidth="0.5" />
             <path d="M50 100 C 50 80, 30 70, 0 80" fill="none" stroke="currentColor" className="text-primary" strokeWidth="0.5" />
             <circle cx="50" cy="100" r="1.5" fill="currentColor" className="text-primary" />
          </svg>
        </div>

      </motion.div>
      </motion.div>
    </>
  );
};

export default WeddingInvitation;
