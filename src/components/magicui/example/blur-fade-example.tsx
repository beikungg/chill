/* eslint-disable @next/next/no-img-element */
import { BlurFade } from "@/components/magicui/blur-fade";

// Academic research and paper related images from Unsplash
const images = [
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop",  // Books and study
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=800&fit=crop",  // Library books
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",  // Library shelves
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop",  // Reading books
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",  // Study desk
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=800&fit=crop",  // Laptop and books
  "https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=600&fit=crop",  // Laboratory research
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=800&fit=crop",  // Books stack
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop",  // Open book reading
];

const imageDescriptions = [
  "Academic books and study materials",
  "Library collection and research resources",
  "University library bookshelves",
  "Reading and studying academic papers",
  "Research workspace with books",
  "Digital and traditional research tools",
  "Scientific laboratory research",
  "Stack of academic publications",
  "Open textbook and learning materials",
];

export function BlurFadeDemo() {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 sm:columns-3">
        {images.map((imageUrl, idx) => (
          <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
            <img
              className="mb-4 size-full rounded-lg object-contain"
              src={imageUrl}
              alt={imageDescriptions[idx]}
            />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
