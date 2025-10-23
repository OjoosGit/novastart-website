import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { Button } from "./ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  image?: any;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  image,
}: HeroProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: image 
              ? `url('${image}')`
              : `url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Lighter overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-primary/20" />
      </div>

      {/* Content */}
      <Container className="relative z-20">
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg whitespace-nowrap" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {subtitle}
            </p>
          )}
          <h1 className="mb-6 text-white text-4xl md:text-5xl">{title}</h1>
          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed drop-shadow-md" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
            {description}
          </p>
          {ctaText && ctaLink && (
            <div className="flex flex-wrap gap-4 relative z-30">
              <Link href={ctaLink}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white shadow-xl">
                  {ctaText}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-2 border-white bg-white/90 text-neutral-900 hover:bg-white hover:text-primary shadow-xl backdrop-blur-sm">
                  Neem contact op
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

