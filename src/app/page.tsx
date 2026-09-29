import { Contact } from '@/sections/Contact';
import { Figures } from '@/sections/Figures';
import { Hero } from '@/sections/Hero';
import { Impact } from '@/sections/Impact';
import { IsatOne } from '@/sections/IsatOne';
import { Phases } from '@/sections/Phases';
import { Spectrum } from '@/sections/Spectrum';
import { Ticker } from '@/components/Ticker';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker variant="light" direction="rtl" />
      <Figures />
      <Spectrum />
      <Phases />
      <IsatOne />
      <Impact />
      <Ticker variant="light" direction="ltr" />
      <Contact />
    </>
  );
}
