/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-950 border-2 border-yellow-500/50 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(234,179,8,0.3)] text-left cursor-default overflow-hidden animate-scaleIn"
      >
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-900/60">
          <h3 className="font-black text-yellow-400 text-lg uppercase tracking-tight">
            {type === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
          </h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm text-zinc-300 leading-relaxed font-sans">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>1. Informações Gerais:</strong> A sua privacidade é de extrema importância para o PackVerso. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nossos serviços e adquirir nossos pacotes de conteúdo.
              </p>
              <p>
                <strong>2. Coleta de Dados:</strong> Coletamos apenas os dados essenciais para o processamento de compra e liberação imediata do produto digital (como seu nome, endereço de e-mail e número de telefone/WhatsApp). Os pagamentos são processados com criptografia de ponta a ponta pela plataforma Kirvano. Não temos acesso aos seus dados de cartão de crédito.
              </p>
              <p>
                <strong>3. Uso das Informações:</strong> Seus dados são utilizados exclusivamente para: envio do link de acesso via e-mail e WhatsApp, notificações sobre atualizações gratuitas de novos vídeos no Google Drive, e suporte técnico ao cliente.
              </p>
              <p>
                <strong>4. Segurança e Sigilo:</strong> Não compartilhamos, vendemos ou alugamos suas informações pessoais com terceiros em hipótese alguma.
              </p>
              <p>
                <strong>5. Contato:</strong> Para dúvidas ou solicitações sobre seus dados, entre em contato através de nossos canais de suporte oficial.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>1. Aceitação dos Termos:</strong> Ao adquirir o "Pack Viral Frutas Falantes" do PackVerso, você concorda com todos os termos e condições aqui dispostos.
              </p>
              <p>
                <strong>2. Licença de Uso:</strong> A compra concede ao comprador uma licença pessoal, intransferível e não exclusiva para utilizar, postar, monetizar e veicular os vídeos e animações em seus perfis de redes sociais (TikTok, Instagram, YouTube, Kwai, etc.). É estritamente proibida a revenda ou rateio não autorizado do acesso ao Google Drive como pacote isolado.
              </p>
              <p>
                <strong>3. Garantia Incondicional de 7 Dias:</strong> Conforme o Código de Defesa do Consumidor, você possui 7 (sete) dias corridos de garantia incondicional a partir da data da compra para testar o material e, caso não fique satisfeito, solicitar 100% do seu dinheiro de volta diretamente pela plataforma de pagamento.
              </p>
              <p>
                <strong>4. Acesso Vitalício e Atualizações:</strong> O acesso ao acervo digital do Drive é vitalício mediante pagamento único (sem mensalidades). As atualizações semanais são disponibilizadas diretamente na pasta compartilhada.
              </p>
            </>
          )}
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900/60 text-right">
          <button
            onClick={onClose}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl cursor-pointer transition active:scale-95 shadow-md"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
