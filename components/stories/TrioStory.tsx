import type { StoryCard } from "@/content/bio";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

/** Three moments side by side: photo, title, one line and its source. Stacks on phones. */
export function TrioStory({ cards }: { cards: StoryCard[] }) {
  return (
    <div className="shell grid gap-10 pb-28 md:grid-cols-3 md:gap-6 lg:gap-8 lg:pb-40">
      {cards.map((c, i) => (
        <Reveal key={c.title} delay={i * 0.08}>
          <article>
            <Photo image={c.image} className="aspect-[4/3] rounded-[24px]" sizes="(min-width: 768px) 32vw, 100vw" />
            <h3 className="display mt-6 text-[clamp(2.5rem,4.5vw,4rem)] text-stage">
              {c.title}
              <VerifyBadge status={c.status} note={c.note} />
            </h3>
            <p className="mt-3 leading-relaxed text-ink/80">{c.lines}</p>
            <SourceLink source={c.source} className="mt-3" />
          </article>
        </Reveal>
      ))}
    </div>
  );
}
