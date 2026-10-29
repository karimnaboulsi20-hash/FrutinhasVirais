/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2,
  X
} from 'lucide-react';
import { VIRAL_ACCOUNTS } from '../utils/salesData';

export default function SocialProofCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMonetizationModalOpen, setIsMonetizationModalOpen] = useState(false);
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);

  const totalAccounts = VIRAL_ACCOUNTS.length;

  // Auto-advance carousel
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalAccounts);
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, totalAccounts]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalAccounts - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalAccounts);
  };

  const handleGoTo = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const currentAccount = VIRAL_ACCOUNTS[currentIndex];

  return (
    <div className="pt-10 pb-6 border-t border-yellow-500/20 text-center w-full px-1 sm:px-4">
      {/* Section Header */}
      <div className="mb-8 px-1 sm:px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-2">
          VOCÊ NÃO PRECISA CRIAR CONTEÚDO
        </h2>
        <p className="text-zinc-300 text-xs sm:text-sm font-semibold max-w-2xl mx-auto">
          Veja abaixo contas reais de{' '}
          <span className="text-green-400 font-bold">Frutas Falantes</span> que
          viralizaram no Instagram e TikTok acumulando centenas de milhares de
          seguidores:
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative max-w-2xl mx-auto px-0.5 sm:px-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {totalAccounts > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Conta anterior"
              className="absolute -left-1 sm:left-1 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 hover:bg-yellow-300 text-black w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-yellow-200 flex items-center justify-center shrink-0"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próxima conta"
              className="absolute -right-1 sm:right-1 top-1/2 -translate-y-1/2 z-20 bg-yellow-400 hover:bg-yellow-300 text-black w-9 h-9 sm:w-12 sm:h-12 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.8)] transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-yellow-200 flex items-center justify-center shrink-0"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3]" />
            </button>
          </>
        )}

        <div className="overflow-hidden py-2 px-0.5">
          <div
            key={currentIndex}
            className="glow-box-gold bg-black rounded-3xl border-2 border-zinc-800 p-4 sm:p-6 shadow-2xl text-zinc-100 relative overflow-hidden text-left hover:border-yellow-400/80 transition-all duration-300 animate-fadeIn"
          >
            {/* Account badge header */}
            <div className="flex items-center justify-between mb-3.5 bg-zinc-900/90 p-2.5 sm:p-3 rounded-2xl border border-yellow-500/30">
              <div className="flex items-center gap-1.5">
                <div className="bg-green-500 p-1.5 rounded-full text-black">
                  <TrendingUp className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-xs font-black text-green-400 uppercase tracking-wide">
                  CONTA VIRAL
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black bg-yellow-400 text-black px-3 py-1 rounded-full uppercase shadow-md">
                {currentAccount.followers} SEGUIDORES
              </span>
            </div>

            {/* Account Screenshot */}
            <div
              onClick={() => setSelectedZoomImage(currentAccount.avatarUrl)}
              className="relative w-full overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-xl group cursor-pointer"
            >
              <img
                src={currentAccount.avatarUrl}
                alt={currentAccount.title || currentAccount.username}
                className="w-full h-auto object-contain max-h-[550px] mx-auto rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-yellow-500/40 opacity-90 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Ampliar Imagem</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        {totalAccounts > 1 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex justify-center items-center gap-2.5">
              {VIRAL_ACCOUNTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoTo(idx)}
                  aria-label={`Ir para conta ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-9 h-3 bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.9)]'
                      : 'w-3 h-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>
                Rola suavemente • {currentIndex + 1} de {totalAccounts} Contas Virais
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Monetization Proof Section */}
      <div className="mt-14 max-w-[1600px] mx-auto px-0 sm:px-2">
        <div className="max-w-5xl mx-auto bg-zinc-950/95 border-2 border-green-500/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 text-center shadow-[0_0_20px_rgba(34,197,94,0.3)] mx-2 sm:mx-auto">
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

        <div className="flex flex-col gap-2">
          <div
            onClick={() => setIsMonetizationModalOpen(true)}
            className="relative group cursor-pointer sm:rounded-3xl overflow-hidden border-y-2 sm:border-2 border-yellow-400/80 shadow-[0_0_45px_rgba(250,204,21,0.35)] bg-black transition-all duration-300 hover:border-yellow-300 hover:shadow-[0_0_65px_rgba(250,204,21,0.6)] mx-auto w-full max-w-none"
          >
            <img
              src="/assets/regenerated_image_1786393784036-BubAREE-.png"
              alt="Print de resultado da Monetização do canal no YouTube Studio - R$ 15.240,87"
              className="w-full h-auto object-cover sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.01]"
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

      {/* Account Image Modal */}
      {selectedZoomImage && (
        <div
          onClick={() => setSelectedZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer animate-fadeIn"
        >
          <div className="w-full max-w-4xl flex items-center justify-between mb-3 px-2 z-10">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-yellow-500/40 text-yellow-400 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Print da Conta Viral do Instagram</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedZoomImage(null);
              }}
              className="bg-yellow-400 text-black hover:bg-yellow-300 px-3.5 py-1.5 rounded-full shadow-2xl transition font-black flex items-center gap-1.5 cursor-pointer border-2 border-yellow-200 active:scale-95"
            >
              <X className="w-5 h-5 stroke-[3]" />
              <span className="text-xs uppercase">Fechar</span>
            </button>
          </div>
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center overflow-auto p-1">
            <img
              src={selectedZoomImage}
              alt="Print da conta viral em tela cheia"
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-2xl border-2 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.6)]"
            />
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 font-bold mt-3 uppercase tracking-wider bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full shadow-xl">
            💡 Toque em qualquer lugar fora para fechar a foto
          </p>
        </div>
      )}

      {/* Monetization Proof Modal */}
      {isMonetizationModalOpen && (
        <div
          onClick={() => setIsMonetizationModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer animate-fadeIn"
        >
          <div className="w-full max-w-5xl flex items-center justify-between mb-3 px-2 z-10">
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-yellow-500/40 text-yellow-400 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Comprovante de Monetização YouTube Studio</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMonetizationModalOpen(false);
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
    </div>
  );
}
