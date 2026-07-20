'use client';

import { useState } from 'react';
import { BookingButton } from '@/components/ui/BookingButton';

const questions = [
  'Vous êtes-vous senti(e) dépassé(e) par les événements ou incapable de contrôler les choses importantes de votre vie ?',
  'Avez-vous eu du mal à vous détendre ou à "décrocher" mentalement, même pendant vos temps libres ?',
  'Avez-vous ressenti de l\u2019irritabilité ou de la nervosité plus fréquemment que d\u2019habitude ?',
  'Avez-vous eu des difficultés à dormir (endormissement, réveils nocturnes, sommeil non réparateur) liées à des soucis ou des pensées qui tournent en boucle ?',
  'Avez-vous ressenti des tensions physiques (maux de tête, mâchoires serrées, douleurs au ventre ou au dos) sans cause médicale claire ?',
  'Avez-vous eu l\u2019impression de ne pas avoir assez de temps pour faire ce que vous deviez faire ?',
];

const labels = ['Jamais', 'Rarement', 'Parfois', 'Souvent', 'Très souvent'];

const levels = [
  { min: 0, max: 6, label: 'stress faible', color: 'text-brand-emerald', bg: 'bg-brand-emerald', description: 'Vous semblez plutôt serein(e) en ce moment.' },
  { min: 7, max: 13, label: 'stress modéré', color: 'text-brand-gold', bg: 'bg-brand-gold', description: 'Quelques tensions à surveiller, pensez à des pauses régulières.' },
  { min: 14, max: 19, label: 'stress élevé', color: 'text-orange-500', bg: 'bg-orange-500', description: 'Il serait utile de mettre en place des stratégies de gestion du stress (sommeil, activité physique, relaxation).' },
  { min: 20, max: 24, label: 'stress très élevé', color: 'text-red-500', bg: 'bg-red-500', description: 'Un accompagnement (médecin traitant, psychologue) pourrait vraiment vous aider à souffler.' },
];

export function StressTest() {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const total = answers.reduce<number>((sum, v) => sum + (v ?? 0), 0);
  const allAnswered = answers.every((v) => v !== null);
  const level = levels.find((l) => total >= l.min && total <= l.max) ?? levels[0];
  const progress = (total / 24) * 100;

  function handleSelect(qIndex: number, value: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = value;
      return next;
    });
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function handleReset() {
    setAnswers(Array(6).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
          Évaluez votre stress
        </p>
        <h1 className="font-display text-3xl font-semibold text-brand-deep sm:text-4xl">
          Test de niveau de stress
        </h1>
        <p className="max-w-2xl text-base leading-7 text-brand-ink/80">
          Pour chaque question, notez de 0 à 4 votre réponse en pensant au dernier mois.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="rounded-2xl border border-brand-mist bg-white/90 p-5 shadow-soft transition-all"
          >
            <p className="text-base font-medium text-brand-deep">
              <span className="mr-2 text-sm font-semibold text-brand-emerald">
                {qIndex + 1}.
              </span>
              {question}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {labels.map((label, vIndex) => (
                <button
                  key={vIndex}
                  onClick={() => handleSelect(qIndex, vIndex)}
                  disabled={submitted}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    answers[qIndex] === vIndex
                      ? 'border-brand-emerald bg-brand-emerald text-white'
                      : 'border-brand-mist bg-brand-paper text-brand-ink hover:border-brand-emerald/50 hover:text-brand-emerald'
                  } ${submitted ? 'cursor-default opacity-60' : 'cursor-pointer'}`}
                >
                  {vIndex} — {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`btn-cta-primary ${!allAnswered ? 'cursor-not-allowed opacity-40' : ''}`}
        >
          Voir mon résultat
        </button>
      )}

      {submitted && (
        <div className="page-section space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-emerald">
              Votre résultat
            </p>
            <p className={`font-display text-4xl font-bold ${level.color}`}>
              {total} / 24
            </p>
            <p className={`text-lg font-semibold ${level.color}`}>{level.label}</p>
          </div>

          <div className="relative h-4 w-full overflow-hidden rounded-full bg-brand-mist">
            <div
              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${level.bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-brand-ink/50">
            <span>0</span>
            <span className="flex-1 border-t border-brand-mist" />
            <span>24</span>
          </div>

          <p className="text-base leading-7 text-brand-ink/80">{level.description}</p>

          <div className="flex flex-wrap gap-4">
            <BookingButton />
            <button onClick={handleReset} className="btn-cta-primary !bg-brand-deep hover:!bg-brand-deepHover">
              Refaire le test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
