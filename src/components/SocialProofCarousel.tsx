/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Maximize2, ZoomIn, X, Instagram, Users, Sparkles } from 'lucide-react';
import { VIRAL_ACCOUNTS, ViralAccount } from '../utils/salesData';

interface LightboxState {
  url: string;
  title: string;
  subtitle?: string;
}

export default function SocialProofCarousel() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  // Repeat the 3 accounts 4 times (12 items) so the infinite marquee glides seamlessly on all screens
  const marqueeAccounts: ViralAccount[] = [
    ...VIRAL_ACCOUNTS,
    ...VIRAL_ACCOUNTS,
    ...VIRAL_ACCOUNTS,
    ...VIRAL_ACCOUNTS
  ];

  return (
    <section className="py-10 sm:py-16 border-t border-yellow-500/20 text-center w-full px-0 sm:px-4 overflow-hidden">
      {/* ============================================================== */}
      {/* 1. CARROSSEL AUTOMÁTICO DE CONTAS QUE JÁ CRESCERAM             */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-4 mb-14 sm:mb-20">
        {/* Title directly above the carousel */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>SUCESSO COMPROVADO</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-yellow-400 uppercase tracking-tight mb-3 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">
          Contas que já cresceram usando esses vídeos
        </h2>
        <p className="text-zinc-300 text-sm sm:text-base font-semibold max-w-2xl mx-auto">
          Veja abaixo perfis reais no Instagram que explodiram em seguidores e visualizações postando conteúdos do nosso pack de{' '}
          <span className="text-green-400 font-bold">Frutas Falantes</span>:
        </p>

        {/* Infinite Continuous Scrolling Track */}
        <div className="relative w-full overflow-hidden py-4 mt-6">
          {/* Edge Fade Gradients */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

          {/* Continuous Gliding Track */}
          <div className="animate-marquee-slow flex gap-4 sm:gap-6 px-4">
            {marqueeAccounts.map((account, idx) => (
              <div
                key={`${account.username}-${idx}`}
                onClick={() =>
                  setLightbox({
                    url: account.avatarUrl,
                    title: `@${account.username}`,
                    subtitle: `${account.followers} seguidores • ${account.posts} publicações`
                  })
                }
                className="glow-box-gold bg-black rounded-3xl border-2 border-zinc-800 p-3 sm:p-4 shadow-2xl text-zinc-100 flex-shrink-0 w-[270px] sm:w-[320px] md:w-[350px] text-left hover:border-yellow-400 transition-all duration-300 group cursor-pointer hover:scale-[1.02]"
              >
                {/* Account Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 bg-zinc-900/90 p-2.5 rounded-2xl border border-yellow-500/30">
                  <div className="flex items-center gap-2 truncate">
                    <div className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-1.5 rounded-full text-white shrink-0 shadow-md">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-yellow-400 truncate">
                      @{account.username}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded-full text-[11px] font-black shrink-0">
                    <Users className="w-3 h-3" />
                    <span>{account.followers}</span>
                  </div>
                </div>

                {/* Screenshot Image Container */}
                <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950 shadow-xl aspect-[9/16] sm:h-[420px]">
                  <img
                    src={account.avatarUrl}
                    alt={`Perfil no Instagram @${account.username}`}
                    className="w-full h-full object-cover object-top rounded-2xl transition-transform duration-500 group-hover:scale-105"
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
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. COMPROVANTE DE MONETIZAÇÃO - R$ 15.240,87 FATURADOS        */}
      {/* ============================================================== */}
      <div className="max-w-5xl mx-auto px-4">
        {/* Header: Escrita em cima da foto com os faturados em 28 dias */}
        <div className="bg-zinc-950/95 border-2 border-green-500/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 text-center shadow-[0_0_20px_rgba(34,197,94,0.3)] mx-auto">
          <span className="bg-green-500 text-black font-black text-xs sm:text-sm px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 inline-block shadow-lg">
            RESULTADO REAL EM DINHEIRO
          </span>
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-green-400 uppercase tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            R$ 15.240,87 FATURADOS EM 28 DIAS
          </h3>
          <p className="text-zinc-200 text-sm sm:text-base font-bold max-w-2xl mx-auto leading-relaxed">
            Este é o resultado real de apenas 1 canal monetizado postando
            diariamente os vídeos do nosso pack de{' '}
            <span className="text-green-400 font-extrabold underline decoration-green-500">
              Frutas Falantes
            </span>
            :
          </p>
        </div>

        {/* Foto do YouTube Studio */}
        <div className="flex flex-col gap-2 max-w-5xl mx-auto">
          <div
            onClick={() =>
              setLightbox({
                url: '/assets/regenerated_image_1786393784036-BubAREE-.png',
                title: 'Comprovante YouTube Studio',
                subtitle: 'R$ 15.240,87 faturados nos últimos 28 dias'
              })
            }
            className="relative group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-yellow-400/80 shadow-[0_0_45px_rgba(250,204,21,0.35)] bg-black transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_0_65px_rgba(250,204,21,0.6)] w-full"
          >
            <img
              src="/assets/regenerated_image_1786393784036-BubAREE-.png"
              alt="Print de resultado da Monetização do canal no YouTube Studio - R$ 15.240,87 faturados em 28 dias"
              className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-yellow-400 text-black font-black text-[9px] sm:text-[11px] px-2.5 py-1.5 rounded-lg uppercase tracking-wide flex items-center gap-1.5 shadow-2xl border border-yellow-200 transition-transform group-hover:scale-105 active:scale-95">
              <Maximize2 className="w-3.5 h-3.5 stroke-[3]" />
              <span>Toque para ver em tela cheia</span>
            </div>
            <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-black/80 px-4 py-2 rounded-2xl border border-yellow-400 flex items-center gap-2 shadow-2xl">
                <Maximize2 className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm">
                  Clique para Ampliar a Imagem
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL (Para Instagram e YouTube Studio)              */}
      {/* ============================================================== */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer animate-fadeIn"
        >
          <div className="w-full max-w-4xl flex items-center justify-between mb-3 px-2 z-10">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-yellow-500/40 text-yellow-400 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{lightbox.title} {lightbox.subtitle ? `• ${lightbox.subtitle}` : ''}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox(null);
              }}
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-3.5 py-1.5 rounded-full shadow-2xl transition font-black flex items-center gap-1.5 cursor-pointer border-2 border-yellow-200 active:scale-95"
            >
              <X className="w-5 h-5 stroke-[3]" />
              <span className="text-xs uppercase">Fechar</span>
            </button>
          </div>
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center overflow-auto p-1">
            <img
              src={lightbox.url}
              alt={lightbox.title}
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
