/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Zap } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { CHECKOUT_URL, YOUTUBE_VIDEO_ID } from '../utils/salesData';
import { trackInitiateCheckout } from '../utils/pixel';

export default function HeroSection() {
  return (
    <section className="relative pt-4 sm:pt-8 pb-10 sm:pb-12 px-1 sm:px-4 md:px-6 max-w-5xl mx-auto text-center overflow-hidden w-full">
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 tracking-tight leading-snug uppercase mb-4 drop-shadow-[0_2px_10px_rgba(234,179,8,0.5)] px-0.5">
        Faça seus primeiros 10K em 30 dias com videos Virais
      </h1>

      {/* Sub-headline */}
      <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-semibold mb-6 max-w-3xl mx-auto leading-relaxed px-0.5">
        Pare de perder horas editando:{' '}
        <span className="text-green-400 font-black underline decoration-green-500">
          COPIE, COLE E VIRALIZE
        </span>{' '}
        usando milhares de cortes prontos.
      </p>

      {/* Hero Mockup with Glowing Gradient border */}
      <div className="relative my-6 max-w-md mx-auto group px-0.5">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-green-500 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-black p-3 sm:p-4 rounded-3xl border-2 border-yellow-500/50 shadow-2xl">
          <img
            src="/assets/regenerated_image_1786419570289-lW0Q_tOW.webp"
            alt="Pack Viral Frutas Falantes - Frutas Falantes"
            className="w-full h-auto object-contain rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-300"
          />
        </div>
      </div>

      {/* Pricing block */}
      <div className="my-6 flex flex-col items-center justify-center font-sans">
        <div className="flex items-center gap-2">
          <span className="italic font-black text-white text-3xl sm:text-4xl tracking-tight">
            DE
          </span>
          <span className="italic font-black text-red-600 text-3xl sm:text-4xl line-through decoration-red-600 decoration-4 tracking-tight">
            R$ 176,93
          </span>
        </div>
        <div className="italic font-black text-white text-2xl sm:text-3xl mt-1 tracking-tight">
          Por apenas
        </div>
        <div className="italic font-black text-[#00FF00] text-7xl sm:text-[100px] leading-none tracking-tighter mt-2 mb-4 drop-shadow-md">
          R$ 19,90
        </div>
        <div className="text-xs sm:text-sm font-black text-yellow-400 uppercase tracking-widest bg-yellow-400/10 px-4 py-1 rounded-full border border-yellow-400/30 inline-block mt-2">
          RISCO ZERO • GARANTIA DE 7 DIAS
        </div>
      </div>

      {/* Primary CTA */}
      <div className="my-8 px-1">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackInitiateCheckout}
          className="btn-pulse-green w-full max-w-md mx-auto bg-green-500 hover:bg-green-400 text-black font-black text-xl sm:text-2xl py-4 sm:py-5 px-4 rounded-2xl shadow-[0_0_35px_rgba(34,197,94,0.8)] transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-green-200 min-h-[60px]"
        >
          <span>QUERO ACESSO IMEDIATO</span>
          <Zap className="w-7 h-7 fill-black shrink-0" />
        </a>
      </div>

      {/* 4 Key Selling Points with matching icons */}
      <div className="my-8 sm:my-10 max-w-xl mx-auto flex flex-col gap-4 text-left px-2 sm:px-0">
        <div className="flex items-center gap-3 sm:gap-4 justify-start">
          <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
            <circle cx="12" cy="12" r="11" fill="#25D366" />
            <path
              d="M7 12.5l3 3 7-7"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className="text-[22px] sm:text-[28px] text-white font-bold italic tracking-tight leading-tight whitespace-nowrap">
            Poste em menos de 30 segundos
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 justify-start">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 sm:w-10 sm:h-10 shrink-0"
            fill="none"
            stroke="#25D366"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12h20M6 12l2-7h8l2 7" />
            <circle cx="8" cy="16" r="3" />
            <circle cx="16" cy="16" r="3" />
            <path d="M11 16h2" />
          </svg>
          <span className="text-[22px] sm:text-[28px] text-white font-bold italic tracking-tight leading-tight whitespace-nowrap">
            Ideal para perfis anônimos
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 justify-start">
          <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
            <path
              d="M10 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"
              fill="#25D366"
            />
            <path
              d="M10 2v2M10 20v2M4 12H2M20 12h-2M5 7l1.5 1.5M17.5 17.5L16 16M5 17l1.5-1.5M17.5 6.5L16 8"
              stroke="#25D366"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M18 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#25D366" />
            <path
              d="M18 12v1M18 21v1M14 17h1M22 17h-1M15.5 14.5l.5.5M20 20l-.5-.5M15.5 19.5l.5-.5M20 14.5l-.5.5"
              stroke="#25D366"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-[22px] sm:text-[28px] text-white font-bold italic tracking-tight leading-tight whitespace-nowrap">
            Conteúdo infinito para viralizar
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 justify-start">
          <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#25D366" />
            <path
              d="M17.5 14.38c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.67-.51-.18-.01-.38-.01-.58-.01-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35z"
              fill="#000"
            />
          </svg>
          <span className="text-[22px] sm:text-[28px] text-white font-bold italic tracking-tight leading-tight whitespace-nowrap">
            Entrega Imediata no WHATSAPP
          </span>
        </div>
      </div>

      {/* Video Presentation Section */}
      <div className="my-10 sm:my-12 max-w-md mx-auto px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-400 uppercase tracking-tight mb-4 drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)]">
          VÍDEO QUE PREPARAMOS PARA VOCÊ
        </h2>
        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-[0_0_25px_rgba(234,179,8,0.25)] bg-zinc-950 aspect-[9/16] max-h-[580px] mx-auto">
          <VideoPlayer videoId={YOUTUBE_VIDEO_ID} />
        </div>
      </div>
    </section>
  );
}
