/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CircleCheckBig, Star } from 'lucide-react';
import { TESTIMONIALS } from '../utils/salesData';

export default function TestimonialsSection() {
  return (
    <section className="py-10 sm:py-12 px-1 sm:px-4 md:px-6 max-w-5xl mx-auto text-center w-full">
      <h2 className="text-2xl sm:text-4xl font-black text-yellow-400 uppercase tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]">
        PESSOAS COMUNS JÁ ESTÃO USANDO
      </h2>
      <p className="text-sm sm:text-base font-semibold text-gray-300 mb-8 sm:mb-10">
        Junte-se a mais de{' '}
        <span className="text-yellow-400 font-bold">4.850 alunos</span> que
        estão viralizando todos os dias.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto text-left">
        {TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.id}
            className="glow-box-gold bg-zinc-950/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center gap-3 mb-3.5">
                <img
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shrink-0"
                />
                <div>
                  <h3 className="font-black text-lg text-zinc-100">
                    {testimonial.name}
                  </h3>
                  <div className="bg-yellow-400/20 text-yellow-300 text-xs font-black px-2.5 py-0.5 rounded-md inline-flex items-center gap-1 border border-yellow-400/40 uppercase mt-0.5">
                    <CircleCheckBig className="w-3.5 h-3.5 fill-yellow-400 text-black" />
                    <span>COMPRA VERIFICADA</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                    <Star
                      key={rIdx}
                      className="w-4 h-4 fill-yellow-400 stroke-yellow-500"
                    />
                  ))}
                </div>
                <span className="text-zinc-400 text-xs font-semibold">
                  {testimonial.timeAgo}
                </span>
              </div>

              <p className="text-base sm:text-base text-zinc-200 italic leading-relaxed font-medium">
                "{testimonial.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
