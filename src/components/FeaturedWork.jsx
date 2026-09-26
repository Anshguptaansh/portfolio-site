import {
  MockInterviewCard,
  PuStackCard,
  QuickApplyCard,
  VoiceModeCard,
  StockVistaCard,
  CryptoVaultCard,
  FinanceTrackerCard,
  CardioVisionCard,
} from './WorkCards';

const FeaturedWork = () => (
  <section id="work" className="px-6 pt-20 pb-24">
    <div className="max-w-[1200px] mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="font-serif-display section-title text-[clamp(48px,7vw,96px)] text-[#111114]">
          Featured Work
        </h2>
        <p className="font-serif-title italic text-[#7a7a83] text-[clamp(16px,1.6vw,22px)] mt-2">
          Highlights from the journey so far
        </p>
      </div>

      {/* Card grid: full-width → 2-col → full-width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <MockInterviewCard />
        </div>

        <PuStackCard />
        <VoiceModeCard />

        <div className="md:col-span-2">
          <QuickApplyCard />
        </div>
      </div>

      {/* ── Personal Projects ── */}
      <div className="mt-20">
        <div className="mb-10">
          <h3 className="font-serif-display text-[clamp(32px,4.5vw,56px)] text-[#111114] leading-none tracking-tight">
            Projects
          </h3>
          <p className="font-serif-title italic text-[#7a7a83] text-[clamp(14px,1.4vw,18px)] mt-2">
            Built from scratch, shipped to production
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <StockVistaCard />
          </div>

          <CryptoVaultCard />
          <FinanceTrackerCard />

          <div className="md:col-span-2">
            <CardioVisionCard />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedWork;
