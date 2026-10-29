/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from './components/HeroSection';
import SocialProofCarousel from './components/SocialProofCarousel';
import MotivesSection from './components/MotivesSection';
import TestimonialsSection from './components/TestimonialsSection';
import BonusAndOfferSection from './components/BonusAndOfferSection';
import FaqAndFooterSection from './components/FaqAndFooterSection';

export default function App() {
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
