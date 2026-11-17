import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { HeroMedia } from "./hero-media";

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <HeroMedia />
      <div className="shell hero-shell">
        <div className="hero-content">
          <p className="hero-eyebrow"><span aria-hidden="true" /><span>LANDSCAPE DESIGN <b aria-hidden="true">•</b> OUTDOOR TRANSFORMATIONS</span></p>
          <h1 id="hero-title">Your Outdoors.<br /><em>Reimagined.</em></h1>
          <p className="hero-description">Beautiful landscapes begin with thoughtful design. Discover outdoor spaces created to bring nature, character and everyday living together.</p>
          <div className="hero-actions">
            <a className="button button-ivory" href="#contact">Start Your Project <ArrowUpRight size={17} strokeWidth={1.65} aria-hidden="true" /></a>
            <a className="button button-outline" href="#work">Explore Our Work <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" /></a>
          </div>
        </div>
        <a className="scroll-cue" href="#about"><span className="scroll-cue-icon"><ArrowDown size={18} strokeWidth={1.55} aria-hidden="true" /></span><span>Scroll to explore</span></a>
      </div>
      <div className="hero-vertical" aria-hidden="true"><span />Designing outdoor experiences</div>
    </section>
  );
}
