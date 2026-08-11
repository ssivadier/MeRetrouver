import { BookingButton } from '@/components/ui/BookingButton';

type ReconnectCTAProps = {
  title?: string;
  description?: string;
};

export function ReconnectCTA({
  title = 'Vous avez déjà été vous-même. Vous pouvez le redevenir.',
  description = 'Une première séance pour faire le point, sans engagement. Vous verrez si cette approche peut vous aider à retrouver un rythme qui vous ressemble.',
}: ReconnectCTAProps) {
  return (
    <section className="page-section flex flex-col items-center gap-6 text-center">
      <h2 className="font-display text-2xl font-semibold text-brand-deep">{title}</h2>
      <p className="max-w-xl text-base leading-7 text-brand-ink/80">{description}</p>
      <BookingButton />
      <p className="text-xs leading-5 text-brand-ink/50">
        Cet accompagnement ne se substitue pas à un suivi médical ou psychologique si nécessaire.
      </p>
    </section>
  );
}
