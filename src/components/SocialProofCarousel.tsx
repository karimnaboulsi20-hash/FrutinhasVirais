/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

export default function SocialProofCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-8 sm:py-12 border-t border-yellow-500/20 text-center w-full px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
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
            onClick={() => setIsModalOpen(true)}
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

      {/* Fullscreen Modal for YouTube Studio screenshot */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer animate-fadeIn"
        >
          <div className="w-full max-w-5xl flex items-center justify-between mb-3 px-2 z-10">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-yellow-500/40 text-yellow-400 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Comprovante YouTube Studio • R$ 15.240,87 em 28 dias</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(false);
              }}
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-3.5 py-1.5 rounded-full shadow-2xl transition font-black flex items-center gap-1.5 cursor-pointer border-2 border-yellow-200 active:scale-95"
            >
              <X className="w-5 h-5 stroke-[3]" />
              <span className="text-xs uppercase">Fechar</span>
            </button>
          </div>
          <div className="relative max-w-5xl max-h-[82vh] w-full flex flex-col items-center justify-center overflow-auto p-1">
            <img
              src="/assets/regenerated_image_1786393784036-BubAREE-.png"
              alt="Comprovante de Monetização YouTube Studio em tela cheia"
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl border-2 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.6)]"
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
