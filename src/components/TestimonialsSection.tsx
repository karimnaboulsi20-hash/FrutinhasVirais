/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ZoomIn, X, TrendingUp, Sparkles } from 'lucide-react';
import { REAL_PEOPLE_PROOF, RealPeopleProofItem } from '../utils/salesData';

export default function TestimonialsSection() {
  const [selectedItem, setSelectedItem] = useState<RealPeopleProofItem | null>(null);

  // Duplicate items array so the continuous marquee track loops endlessly without cuts
  const marqueeItems = [...REAL_PEOPLE_PROOF, ...REAL_PEOPLE_PROOF];

  return (
    <section id="prova-social" className="py-10 sm:py-14 px-0 sm:px-4 md:px-6 max-w-7xl mx-auto text-center w-full overflow-hidden scroll-mt-8">
      {/* Title directly above as requested */}
      <div className="mb-8 px-4">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>PROVA SOCIAL REAL</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-yellow-400 uppercase tracking-tight mb-3 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
          Pessoas reais que não perderam tempo
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
          Veja abaixo os comprovantes reais de alunos que já estão faturando alto postando os vídeos de{' '}
          <span className="text-green-400 font-bold">Frutas Falantes</span>:
        </p>
      </div>

      {/* Infinite Continuous Scrolling Track Container */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right Edge Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

        {/* Continuous Gliding Track */}
        <div className="animate-marquee-slow flex gap-4 sm:gap-6 px-4">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedItem(item)}
              className="glow-box-gold bg-black rounded-3xl border-2 border-zinc-800 p-3.5 sm:p-5 shadow-2xl text-zinc-100 flex-shrink-0 w-[280px] sm:w-[360px] md:w-[400px] text-left hover:border-yellow-400 transition-all duration-300 group cursor-pointer hover:scale-[1.02]"
            >
              {/* Item Header Badge */}
              <div className="flex items-center justify-between gap-1.5 mb-3 bg-zinc-900/90 p-2.5 rounded-2xl border border-yellow-500/30">
                <div className="flex items-center gap-1.5 truncate">
                  <div className="bg-green-500 p-1 rounded-full text-black shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-green-400 uppercase tracking-wide truncate">
                    {item.title}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-black bg-yellow-400 text-black px-2.5 py-0.5 rounded-full uppercase shrink-0 shadow-md">
                  {item.resultText}
                </span>
              </div>

              {/* Screenshot Image Container */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-xl">
                <img
                  src={item.imageUrl}
                  alt={`Comprovante real - ${item.title}`}
                  className="w-full h-[320px] sm:h-[400px] object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                
                {/* Zoom Badge */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/85 backdrop-blur-md text-yellow-400 text-[11px] font-bold px-2.5 py-1 rounded-xl border border-yellow-500/40 flex items-center gap-1 shadow-lg">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub-label explaining continuous motion */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-400 font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Passando continuamente • Passe o mouse ou toque para pausar</span>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer animate-fadeIn"
        >
          <div className="w-full max-w-4xl flex items-center justify-between mb-3 px-2 z-10">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-yellow-500/40 text-yellow-400 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{selectedItem.title} • {selectedItem.resultText}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-3.5 py-1.5 rounded-full shadow-2xl transition font-black flex items-center gap-1.5 cursor-pointer border-2 border-yellow-200 active:scale-95"
            >
              <X className="w-5 h-5 stroke-[3]" />
              <span className="text-xs uppercase">Fechar</span>
            </button>
          </div>
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center overflow-auto p-1">
            <img
              src={selectedItem.imageUrl}
              alt={`Print em tela cheia - ${selectedItem.title}`}
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl border-2 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.6)]"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-bold mt-3 uppercase tracking-wider bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full shadow-xl">
            💡 Toque em qualquer lugar fora para fechar a foto
          </p>
        </div>
      )}
    </section>
  );
}
