import { ProfileHero } from '@/components/about/ProfileHero';
import { ProfileStory } from '@/components/about/ProfileStory';
import { WhyThisPath } from '@/components/about/WhyThisPath';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-paper px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ProfileHero />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <ProfileStory />
          <ProfileStory
            title="Formation et expérience"
            text="Vous pouvez ici détailler votre formation suivie, votre expérience professionnelle et votre évolution dans la pratique."
            bulletPoints={['Formation suivie', 'Années de pratique', 'Approche personnelle']}
          />
        </div>
        <WhyThisPath />
      </div>
    </main>
  );
}
