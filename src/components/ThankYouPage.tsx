/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, ShieldCheck, Sparkles, MessageCircle, Home } from 'lucide-react';

interface ThankYouPageProps {
  onReturnHome?: () => void;
}

export default function ThankYouPage({ onReturnHome }: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 text-center font-sans">
      <div className="max-w-xl w-full bg-zinc-950 border-2 border-green-500/80 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(34,197,94,0.35)] relative overflow-hidden">
        {/* Glowing badge */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/40 text-green-400 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-6">
          <Sparkles className="w-4 h-4" />
          <span>COMPRA CONFIRMADA • PAGAMENTO APROVADO</span>
        </div>

        {/* Checkmark icon */}
        <div className="w-20 h-20 bg-green-500/20 rounded-full border-2 border-green-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-3">
          OBRIGADO PELA SUA COMPRA!
        </h1>

        <p className="text-base sm:text-lg text-zinc-200 font-semibold mb-6 leading-relaxed">
          Seu acesso ilimitado ao{' '}
          <span className="text-green-400 font-extrabold underline decoration-green-500">
            Pack Viral Frutas Falantes
          </span>{' '}
          foi processado com sucesso.
        </p>

        {/* Access instruction box */}
        <div className="bg-zinc-900/90 border border-yellow-500/40 rounded-2xl p-5 mb-8 text-left space-y-3 shadow-inner">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base text-zinc-200 font-semibold leading-snug">
              <strong>Envio Imediato:</strong> Verifique sua caixa de entrada no e-mail cadastrado e suas mensagens no WhatsApp.
            </span>
          </div>

          <div className="flex items-start gap-3 border-t border-zinc-800 pt-3">
            <MessageCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <span className="text-sm sm:text-base text-zinc-200 font-semibold leading-snug">
              <strong>Suporte VIP:</strong> Qualquer dúvida, nossa equipe de suporte está disponível para te ajudar nas postagens.
            </span>
          </div>
        </div>

        {/* Action Button */}
        {onReturnHome ? (
          <button
            onClick={onReturnHome}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg sm:text-xl py-4 px-6 rounded-2xl transition cursor-pointer shadow-[0_0_25px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-yellow-200 active:scale-95"
          >
            <Home className="w-5 h-5" />
            <span>Voltar para a Página Principal</span>
          </button>
        ) : (
          <a
            href="/"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg sm:text-xl py-4 px-6 rounded-2xl transition cursor-pointer shadow-[0_0_25px_rgba(250,204,21,0.6)] flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-green-200 active:scale-95 inline-flex"
          >
            <Home className="w-5 h-5" />
            <span>Voltar para a Página Principal</span>
          </a>
        )}

        <p className="text-xs text-zinc-500 font-medium mt-6">
          © {new Date().getFullYear()} PackVerso. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
