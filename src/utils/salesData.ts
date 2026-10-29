/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ViralAccount {
  username: string;
  title: string;
  posts: string;
  followers: string;
  following: string;
  category: string;
  bio: string;
  avatarUrl: string;
}

export interface MotiveItem {
  id: number;
  title: string;
  badge: string;
  description: string;
  imageUrl: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
  timeAgo: string;
  rating: number;
  comment: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Checkout URLs
export const HERO_CHECKOUT_URL = "#oferta";
export const CHECKOUT_URL = "https://pay.kirvano.com/ddac7633-64ed-4903-8087-052abc044530";
export const YOUTUBE_VIDEO_ID = "IAw1_SA34J8";

export const VIRAL_ACCOUNTS: ViralAccount[] = [
  {
    username: "frutas_.historia",
    title: "HISTÓRIAS DAS FRUTAS",
    posts: "598",
    followers: "657 mil",
    following: "0",
    category: "Criador(a) de conteúdo digital",
    bio: `🍎 Você vai maratonar frutas sem perceber
🍇 Episódios rápidos e viciantes
🔥 Quem segue não perde os próximos
👇 Sigam a página agora`,
    avatarUrl: "/assets/real_screenshot_frutas_historia-CJLbW6nZ.jpg"
  },
  {
    username: "historia_.ia",
    title: "HISTÓRIA DAS FRUTAS",
    posts: "92",
    followers: "296 mil",
    following: "0",
    category: "Criador(a) de conteúdo digital",
    bio: `🍎 Você vai maratonar frutas sem perceber
🍇 Episódios rápidos e viciantes
🔥 Quem segue não perde os próximos
👇 Sigam a página agora`,
    avatarUrl: "/assets/real_user_instagram_screenshot-BKJu78VL.jpg"
  },
  {
    username: "historinhasdasfrutas",
    title: "Isael Junior | Historia Das Frutas",
    posts: "148",
    followers: "208 mil",
    following: "0",
    category: "Criador de conteúdo de IA",
    bio: `🍓 Começa com 1... Termina viciado(a)
🎬 Drama, plot twist e finais que prendem
✉️ Parcerias via direct
👇 Acesse aqui 🚀 para seu 1º vídeo...`,
    avatarUrl: "/assets/real_screenshot_frutas_historia-CJLbW6nZ.jpg"
  }
];

export const MOTIVE_ITEMS: MotiveItem[] = [
  {
    id: 1,
    title: "FÁCIL EDIÇÃO E PRONTO PARA USAR",
    badge: "1-CLIQUE",
    description: "Os vídeos já vêm prontos, renderizados em HD e com áudio sincronizado. É só baixar e postar direto pelo celular sem complicação.",
    imageUrl: "/assets/frutas_abacaxi_maromba_1786296212822-D27HdQJJ.jpg",
    iconName: "Zap"
  },
  {
    id: 2,
    title: "FACILIDADE EXTREMA PARA VIRALIZAR",
    badge: "ALGORITMO AMOU",
    description: "Animações 3D de Frutas Falantes estão no topo da retenção no TikTok, Reels e Shorts. O algoritmo entrega para milhares de pessoas espontaneamente.",
    imageUrl: "/assets/frutas_melancia_boss_1786296225794-DokY4uh1.jpg",
    iconName: "TrendingUp"
  },
  {
    id: 3,
    title: "SUPORTE EXCLUSIVO & VIP",
    badge: "SUPORTE DEDICADO",
    description: "Você não estará sozinho. Receba suporte direto via WhatsApp para tirar dúvidas sobre postagens, horários de pico e estratégias de crescimento.",
    imageUrl: "/assets/frutas_uva_patricinha_1786296240254-8pCEonYL.jpg",
    iconName: "Headphones"
  },
  {
    id: 4,
    title: "100% ANÔNIMO (SEM PRECISAR APARECER)",
    badge: "MODO ANÔNIMO",
    description: "Crie canais Dark lucrativos e ganhe dinheiro na internet sem precisar gravar sua voz ou expor seu rosto.",
    imageUrl: "/assets/frutas_banana_divertida_1786296252384-B3JI98w5.jpg",
    iconName: "EyeOff"
  },
  {
    id: 5,
    title: "RETENÇÃO HIPNÓTICA EM 3D",
    badge: "ALTA RETENÇÃO",
    description: "Personagens engraçados como o Abacaxi Maromba, Melancia de Óculos e Uva Patricinha prendem a atenção do público do primeiro ao último segundo.",
    imageUrl: "/assets/frutas_falantes_cover_1786295507151-Couaqo65.jpg",
    iconName: "Sparkles"
  },
  {
    id: 6,
    title: "ATUALIZAÇÕES SEMANAIS GRATUITAS",
    badge: "CONTEÚDO INFINITO",
    description: "Novos vídeos de Frutas Falantes são adicionados semanalmente no drive sem você pagar um centavo a mais por isso.",
    imageUrl: "/assets/frutas_laranja_refresh_1786297559426-DZdYj3Mf.jpg",
    iconName: "RefreshCw"
  },
  {
    id: 7,
    title: "COMPARTILHAMENTO MASSIVO",
    badge: "VIRAL NO WHATSAPP",
    description: "Vídeos divertidos com piadas e frases marcantes fazem as pessoas enviarem nos grupos de família e amigos, multiplicando suas visualizações.",
    imageUrl: "/assets/frutas_tomate_share_1786297575029-CRvbvA7v.jpg",
    iconName: "Share2"
  },
  {
    id: 8,
    title: "ECONOMIA EXTREMA DE TEMPO",
    badge: "SEU TEMPO DE VOLTA",
    description: "Esqueça passar 5 horas aprendendo softwares pesados de 3D ou edição no CapCut. Tudo o que você precisa já foi feito por especialistas.",
    imageUrl: "/assets/frutas_kiwi_clock_1786297586571-CNOhijuN.jpg",
    iconName: "Clock"
  },
  {
    id: 9,
    title: "MONETIZAÇÃO RÁPIDA EM 30 DIAS",
    badge: "PRIMEIROS 10K",
    description: "Alcance os requisitos de monetização das redes sociais rapidamente postando de 2 a 3 vídeos por dia de forma consistente.",
    imageUrl: "/assets/frutas_pitaya_money_1786297599358-Cda2nLd1.jpg",
    iconName: "DollarSign"
  },
  {
    id: 10,
    title: "COMPATÍVEL COM QUALQUER CELULAR",
    badge: "ANDROID E IPHONE",
    description: "Acesse todo o acervo em alta qualidade pelo Google Drive. Funciona perfeitamente em qualquer smartphone ou computador.",
    imageUrl: "/assets/frutas_manga_celular_1786297611570-CeJOfSWM.jpg",
    iconName: "Smartphone"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Camila Souza",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "Há 2 dias",
    rating: 5,
    comment: "Postei os vídeos prontos durante uma semana e já consegui pegar mais de 12 mil visualizações sem aparecer."
  },
  {
    id: "2",
    name: "Lucas Martins",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "Ontem",
    rating: 5,
    comment: "Eu não sabia editar nada. Peguei os vídeos do pack e consegui postar 3 conteúdos por dia em poucos minutos."
  },
  {
    id: "3",
    name: "Rafael Lima",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
    timeAgo: "Há 5 dias",
    rating: 5,
    comment: "Comecei usando os cortes no nicho motivacional e já consegui minhas primeiras vendas reaproveitando os vídeos."
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "1",
    question: "Preciso aparecer?",
    answer: "Não. Os vídeos já estão prontos pra você postar anonimamente se preferir."
  },
  {
    id: "2",
    question: "Preciso editar?",
    answer: "Não. Você pode apenas baixar e postar direto nas suas redes."
  },
  {
    id: "3",
    question: "Como recebo?",
    answer: "O acesso é imediato e enviado para o seu e-mail assim que o pagamento for aprovado."
  },
  {
    id: "4",
    question: "Funciona pra iniciante?",
    answer: "Sim. O pack foi feito exatamente para quem não tem experiência nenhuma com edição ou criação."
  }
];

/**
 * Calculates percentage discount between original price and promotional price
 */
export function calculateDiscountPercentage(original: number, promotional: number): number {
  if (original <= 0 || promotional < 0) return 0;
  const discount = ((original - promotional) / original) * 100;
  return Math.round(discount);
}

/**
 * Formats Brazilian Real currency
 */
export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
