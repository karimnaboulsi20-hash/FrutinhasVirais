/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import SocialProofCarousel from './components/SocialProofCarousel';
import MotivesSection from './components/MotivesSection';
import TestimonialsSection from './components/TestimonialsSection';
import BonusAndOfferSection from './components/BonusAndOfferSection';
import FaqAndFooterSection from './components/FaqAndFooterSection';
import ThankYouPage from './components/ThankYouPage';

export default function App() {
  const [isThankYouPage, setIsThankYouPage] = useState(false);

  useEffect(() => {
    // Check if path is /obrigado or if query params indicate purchase completion
    const path = window.location.pathname;
    const search = window.location.search.toLowerCase();

    const isPurchaseRedirect =
      path.includes('obrigado') ||
      search.includes('purchase=true') ||
      search.includes('status=approved') ||
      search.includes('status=paid') ||
      search.includes('success=1') ||
      search.includes('obrigado=1');

    if (isPurchaseRedirect) {
      setIsThankYouPage(true);
    }
  }, []);

  if (isThankYouPage) {
    return <ThankYouPage onReturnHome={() => setIsThankYouPage(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black">
      <main>
        <HeroSection />
        <SocialProofCarousel />
        <MotivesSection />
        <TestimonialsSection />
        <BonusAndOfferSection />
        <FaqAndFooterSection />
      </main>
    </div>
  );
}
