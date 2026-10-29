/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rocket, CircleCheck } from 'lucide-react';
import { MOTIVE_ITEMS } from '../utils/salesData';

const STEPS = [
  { num: '1', text: 'Escolha um vídeo pronto' },
  { num: '2', text: 'Poste no TikTok ou Instagram' },
  { num: '3', text: 'Repita todos os dias' },
  {
    num: <Rocket className="w-7 h-7" />,
    text: 'Comece a crescer'
  }
];

export default function MotivesSection() {
  return (
    <section className="py-10 sm:py-12 px-1 sm:px-4 md:px-6 max-w-5xl mx-auto text-center w-full">
      {/* Quote Banner */}
      <div className="glow-box-gold rounded-2xl p-5 sm:p-6 mb-10 sm:mb-12 bg-black/90">
        <h2 className="text-xl sm:text-2xl font-black text-yellow-300 uppercase leading-snug mb-2">
          Quem cresce hoje{' '}
          <span className="underline underline-offset-4 text-white">
            não cria do zero
          </span>
          . Eles reaproveitam vídeos que já viralizaram.
        </h2>
        <p className="text-green-400 font-extrabold text-base sm:text-lg">
          O jogo é volume, não perfeição.
        </p>
      </div>

      {/* Simple 4-Step Process */}
      <h2 className="text-2xl sm:text-3xl font-black text-yellow-400 uppercase tracking-tight mb-8">
        É SIMPLES ASSIM
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        {STEPS.map((step, idx) => (
          <div
            key={idx}
            className="relative bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-yellow-400/80 hover:shadow-[0_0_25px_rgba(250,204,21,0.15)] hover:-translate-y-1 overflow-hidden group"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl group-hover:bg-yellow-400/10 transition-colors duration-500" />
            <div className="relative flex items-center justify-center mb-5">
              <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500" />
              <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-600 text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black shadow-[0_0_15px_rgba(250,204,21,0.5)] border border-yellow-200">
                {step.num}
              </div>
            </div>
            <p className="text-zinc-100 text-base sm:text-lg uppercase font-black tracking-tight text-center relative z-10 group-hover:text-white">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      {/* 10 Motives Header */}
      <div className="mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-3">
          +50.000 VÍDEOS DE FRUTAS FALANTES PRONTOS PARA POSTAR
        </h2>
        <div className="inline-block bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
          10 MOTIVOS PELOS QUAIS ESSE PACK FUNCIONA DE VERDADE
        </div>
      </div>

      {/* Motives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
        {MOTIVE_ITEMS.map((item) => (
          <div
            key={item.id}
            className="glow-box-gold bg-zinc-950/95 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl hover:border-yellow-400 transition-all duration-300 group"
          >
            <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="bg-green-500/90 text-black font-black text-[10px] px-3 py-1 rounded-full uppercase shadow-lg border border-green-300">
                  {item.badge}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-xs shadow-md">
                  #{item.id}
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-black text-base sm:text-lg text-yellow-400 uppercase mb-1.5 tracking-tight flex items-center gap-2">
                  <CircleCheck className="w-5 h-5 text-green-400 shrink-0" />
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-semibold">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
