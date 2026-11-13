import { CutoutHero } from "@/components/hero/CutoutHero";
import { WordReveal } from "@/components/motion/WordReveal";
import { InterviewCarousel } from "@/components/sections/InterviewCarousel";
import { StackCards } from "@/components/sections/StackCards";
import { CallStory } from "@/components/stories/CallStory";
import { PlacesStory } from "@/components/stories/PlacesStory";
import { RevealStory } from "@/components/stories/RevealStory";
import { StepsStory } from "@/components/stories/StepsStory";
import { SourceLink } from "@/components/ui/Verify";
import { heroCutout, stories } from "@/content/bio";
import { interviews, youtubeThumb, youtubeUrl } from "@/content/interviews";
import { publishable } from "@/lib/publish";

// Lets the interviews appear in video search results.
const videoJsonLd = {
  "@context": "https://schema.org",
  "@graph": interviews.map((v) => ({
    "@type": "VideoObject",
    name: v.title,
    description: `${v.channel}${v.detail ? `: ${v.detail}` : ""}. An interview with Udaykumar Shiroorkar.`,
    thumbnailUrl: youtubeThumb(v.youtubeId),
    uploadDate: v.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
    url: youtubeUrl(v.youtubeId),
  })),
};

export default function Home() {

  return (
    <>
      <script
        type="application/ld+json"
        // Static data from content/interviews.ts; escaping "<" keeps it from closing the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd).replace(/</g, "\u003c") }}
      />
      <CutoutHero desktop={heroCutout.desktop} mobile={heroCutout.mobile} />

      {/* Interviews */}
      {interviews.length > 0 && (
        <section aria-labelledby="interviews-title" className="shell pt-28 lg:pt-40">
          <h2 id="interviews-title" className="display text-[clamp(3.5rem,10vw,9rem)] text-stage">
            In his <span className="font-serif font-normal normal-case italic tracking-normal text-forest">words</span>
          </h2>
          <div className="mt-6">
            <InterviewCarousel items={interviews} />
          </div>
        </section>
      )}

      {/* Stories: a sentence that lights up on scroll, then a layout of its own. */}
      {stories.map((story) => {
        const cards = publishable(story.cards);
        if (cards.length === 0) return null;
        return (
          <section key={story.id} id={story.id} aria-labelledby={`${story.id}-title`}>
            <h2 id={`${story.id}-title`} className="sr-only">
              {story.title}
            </h2>
            <div className="shell pb-12 pt-20 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-48">
              <WordReveal
                className="max-w-6xl text-[clamp(2rem,5.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-stage"
                segments={story.statement}
              />
              <SourceLink source={story.source} className="mt-6" />
            </div>
            {story.layout === "cards" && (
              <div className="shell pb-28 lg:pb-40">
                <StackCards items={cards} />
              </div>
            )}
            {story.layout === "steps" && <StepsStory cards={cards} />}
            {story.layout === "places" && <PlacesStory story={story} cards={cards} />}
            {story.layout === "call" && <CallStory cards={cards} />}
            {story.layout === "reveal" && <RevealStory story={story} cards={cards} />}
          </section>
        );
      })}

    </>
  );
}
