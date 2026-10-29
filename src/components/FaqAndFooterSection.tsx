/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CirclePlay
} from 'lucide-react';
import { FAQ_ITEMS, CHECKOUT_URL } from '../utils/salesData';
import { trackInitiateCheckout } from '../utils/pixel';
import LegalModal from './LegalModal';

export default function FaqAndFooterSection() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>('1');
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const toggleFaq = (id: string) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <section className="py-10 sm:py-12 px-1 sm:px-4 md:px-6 max-w-5xl mx-auto text-center w-full">
      {/* 7 Days Guarantee Badge */}
      <div className="flex flex-col items-center justify-center my-6">
        <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-gradient-to-b from-yellow-500 via-amber-600 to-yellow-600 flex flex-col items-center justify-center p-2 shadow-[0_0_25px_rgba(234,179,8,0.5)] text-black font-black uppercase text-center relative">
          <ShieldCheck className="w-8 h-8 text-black mb-0.5" />
          <span className="text-[13px] leading-tight font-black">7 DIAS</span>
          <span className="text-[9px] tracking-widest font-extrabold">GARANTIA</span>
        </div>
      </div>

      {/* FAQ Title */}
      <h2 className="text-3xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-8">
        FAQ
      </h2>

      {/* FAQ Accordion List */}
      <div className="max-w-2xl mx-auto space-y-3.5 text-left mb-16">
        {FAQ_ITEMS.map((item) => {
          const isOpen = activeFaqId === item.id;
          return (
            <div
              key={item.id}
              className="glow-box-gold rounded-2xl overflow-hidden bg-black/90 transition-all"
            >
              <button
                onClick={() => toggleFaq(item.id)}
                className="w-full p-4 sm:p-5 text-left font-black text-yellow-400 text-base sm:text-lg flex items-center justify-between gap-3 cursor-pointer hover:bg-yellow-500/10 transition"
              >
                <span>{item.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-yellow-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-yellow-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-base text-zinc-200 font-semibold leading-relaxed border-t border-yellow-500/20 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Call to Action */}
      <div className="my-12">
        <h2 className="text-3xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-2">
          COMECE HOJE MESMO
        </h2>
        <p className="text-sm sm:text-base font-semibold text-zinc-300 mb-6 max-w-xl mx-auto leading-relaxed">
          Garanta seu acesso ilimitado aos{' '}
          <span className="text-yellow-400 font-extrabold">
            +50.000 cortes virais de Frutas Falantes
          </span>{' '}
          com todos os bônus exclusivos por apenas{' '}
          <span className="text-green-400 font-extrabold">R$ 19,90</span>.
        </p>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackInitiateCheckout}
          className="btn-pulse-green w-full max-w-md mx-auto bg-green-500 hover:bg-green-400 text-black font-black text-xl sm:text-2xl py-4 sm:py-5 px-6 rounded-2xl shadow-[0_0_35px_rgba(34,197,94,0.8)] transition cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-green-200 min-h-[60px]"
        >
          QUERO MEU ACESSO AGORA
        </a>
      </div>

      {/* Brand Footer */}
      <footer className="pt-12 border-t border-zinc-800 flex flex-col items-center justify-center gap-4 text-xs text-zinc-500">
        <div className="w-12 h-12 rounded-full border-2 border-yellow-400/80 bg-zinc-950 flex flex-col items-center justify-center text-yellow-400 shadow-md">
          <CirclePlay className="w-6 h-6 fill-yellow-400 text-black" />
        </div>
        <p className="font-semibold text-zinc-400">PackVerso</p>

        <div className="flex gap-4 font-medium text-[11px] text-zinc-400">
          <button
            onClick={() => setLegalModalType('privacy')}
            className="hover:text-yellow-400 transition cursor-pointer"
          >
            Política de Privacidade
          </button>
          <span>|</span>
          <button
            onClick={() => setLegalModalType('terms')}
            className="hover:text-yellow-400 transition cursor-pointer"
          >
            Termos de Uso
          </button>
        </div>

        <p className="text-[10px] text-zinc-600 mt-2">
          © {new Date().getFullYear()} PackVerso. Todos os direitos reservados.
        </p>
      </footer>

      {/* Modal Dialog */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </section>
  );
}
