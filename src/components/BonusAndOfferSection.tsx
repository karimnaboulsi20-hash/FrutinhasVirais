/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Check,
  Gift,
  Flame,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { CHECKOUT_URL } from '../utils/salesData';
import { trackInitiateCheckout } from '../utils/pixel';

const ASSURANCES = [
  'Não precisa aparecer',
  'Não precisa editar',
  'Não precisa ter experiência',
  'Conteúdo validado',
  'Alta chance de viralização'
];

const BONUSES = [
  'Banco de memes virais',
  'Storys prontos',
  'Músicas virais em alta'
];

export default function BonusAndOfferSection() {
  return (
    <section className="py-10 sm:py-12 px-1 sm:px-4 md:px-6 max-w-5xl mx-auto text-center w-full">
      {/* 5 Assurances Pills */}
      <div className="max-w-xl mx-auto space-y-2.5 sm:space-y-3 mb-10 sm:mb-12">
        {ASSURANCES.map((item, idx) => (
          <div
            key={idx}
            className="glow-box-gold rounded-2xl py-3.5 px-4 sm:px-5 text-center font-extrabold text-white text-base sm:text-lg flex items-center justify-center gap-2 bg-black/90"
          >
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Bonus Header */}
      <h2 className="text-xl sm:text-3xl font-black text-yellow-400 uppercase tracking-tight mb-4 flex items-center justify-center gap-2">
        <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-400 animate-pulse" />
        <span>VOCÊ AINDA RECEBE BÔNUS EXCLUSIVOS</span>
      </h2>

      {/* Bonus Box */}
      <div className="glow-box-gold rounded-2xl p-5 sm:p-6 max-w-xl mx-auto mb-12 sm:mb-16 bg-black/95">
        <ul className="space-y-3.5 text-center text-base sm:text-lg font-extrabold text-zinc-100">
          {BONUSES.map((bonus, idx) => (
            <li key={idx} className="flex items-center justify-center gap-2">
              <Check className="w-5.5 h-5.5 text-green-400 shrink-0" />
              <span>{bonus}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Pricing Offer Card */}
      <h2 className="text-2xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-8">
        ADQUIRA SEU PACK AQUI↓
      </h2>

      <div className="relative max-w-2xl mx-auto">
        <div className="bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 rounded-3xl p-4 sm:p-8 border-2 sm:border-4 border-yellow-400 shadow-[0_0_60px_rgba(250,204,21,0.35)] relative text-zinc-100 text-center">
          {/* Top highlight ribbon */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-black font-black text-xs sm:text-sm px-6 py-2 rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.8)] flex items-center gap-2 border-2 border-yellow-200">
            <Flame className="w-4 h-4 fill-black shrink-0" />
            <span>MAIS VENDIDO • OFERTA ESPECIAL</span>
          </div>

          <div className="pt-4 mb-6">
            <h3 className="font-black text-2xl sm:text-3xl text-yellow-400 uppercase tracking-tight mb-1">
              PACK COMPLETO FRUTAS FALANTES
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-semibold">
              O acervo definitivo de vídeos 3D animados prontos para postar e viralizar
            </p>
          </div>

          {/* Group 3D Image */}
          <div className="mb-6 rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl bg-zinc-900 relative group">
            <img
              src="/assets/frutas_grupo_completo_1990_1786300483020-B_2fTas6.jpg"
              alt="Frutas Falantes todas juntas em 3D"
              className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md border border-yellow-400/50 text-yellow-400 text-[10px] sm:text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personagens 3D HD Exclusivos</span>
            </div>
          </div>

          {/* Offer Price Highlight */}
          <div className="bg-black/80 border border-yellow-500/40 rounded-2xl p-4 sm:p-5 mb-6 text-center shadow-inner flex flex-col items-center justify-center font-sans">
            <div className="flex items-center gap-2">
              <span className="italic font-black text-white text-3xl sm:text-4xl tracking-tight">
                DE
              </span>
              <span className="italic font-black text-red-600 text-3xl sm:text-4xl line-through decoration-red-600 decoration-4 tracking-tight">
                R$ 197,00
              </span>
            </div>
            <div className="italic font-black text-white text-2xl sm:text-3xl mt-1 tracking-tight">
              Por apenas
            </div>
            <div className="italic font-black text-[#00FF00] text-7xl sm:text-[100px] leading-none tracking-tighter mt-2 mb-4 drop-shadow-md">
              R$ 19,90
            </div>
            <span className="text-xs font-black text-yellow-400 uppercase tracking-wide bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/30 inline-block mt-1">
              PAGAMENTO ÚNICO • SEM MENSALIDADES • ACESSO VITALÍCIO
            </span>
          </div>

          {/* Benefits List */}
          <div className="border-t border-b border-zinc-800 py-5 mb-8 text-left space-y-3.5 text-sm sm:text-base font-bold text-zinc-100">
            <div className="flex items-start gap-3 bg-green-950/40 p-3 rounded-xl border border-green-500/40">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-green-300 font-extrabold text-sm sm:text-base leading-snug">
                +50.000 Cortes virais frutas falantes (Acesso ilimitado)
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Todos os personagens em 3D: Abacaxi Maromba, Melancia Boss, Uva Patricinha, Banana e muito mais
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                <strong className="text-white">Atualizações semanais gratuitas</strong> direto no Google Drive sem pagar nada a mais
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Todos os Bônus Exclusivos inclusos (Banco de Memes, Músicas Virais, Storys Prontos)
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Vídeos em Altíssima Definição com áudio e legenda 100% sincronizados
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <Check className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Entrega imediata e automática via WhatsApp e E-mail
              </span>
            </div>

            <div className="flex items-start gap-3 pl-1">
              <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Garantia incondicional de 7 dias (Risco Zero)
              </span>
            </div>
          </div>

          {/* CTA Link */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackInitiateCheckout}
            className="btn-pulse-green w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 sm:py-5 px-5 rounded-2xl text-lg sm:text-2xl uppercase transition cursor-pointer shadow-[0_0_35px_rgba(34,197,94,0.7)] flex items-center justify-center gap-2.5 tracking-wide text-center min-h-[60px]"
          >
            <span>QUERO MEU ACESSO AGORA</span>
            <Zap className="w-6 h-6 fill-black shrink-0" />
          </a>

          <p className="text-xs text-zinc-400 font-semibold mt-3">
            🔒 Compra 100% Segura • Acesso imediato no seu e-mail e WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
