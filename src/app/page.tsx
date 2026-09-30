import { Contact } from '@/sections/Contact';
import { Figures } from '@/sections/Figures';
import { Hero } from '@/sections/Hero';
import { Impact } from '@/sections/Impact';
import { IsatOne } from '@/sections/IsatOne';
import { Phases } from '@/sections/Phases';
import { Spectrum } from '@/sections/Spectrum';
import { Countdown } from '@/components/Countdown';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Figures />
      <Spectrum />
      <Phases />
      <IsatOne />
      <Impact />
      <Countdown variant="light" />
      <Contact />
    </>
  );
}
