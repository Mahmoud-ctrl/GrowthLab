import { SiInstagram, SiTiktok } from "react-icons/si";
import { Logo } from "./logo";
import { Container } from "./primitives";
import { PROGRAM } from "./data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-paper py-14">
      <Container>
        <div className="flex flex-col items-center text-center">
          <Logo className="h-12 w-auto sm:h-14" />

          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-2">
            GrowthLab is a hands-on learning experience that bridges the gap
            between marketing knowledge and real-world practice.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={PROGRAM.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GrowthLab on Instagram"
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <SiInstagram className="size-[18px]" aria-hidden />
            </a>
            <a
              href={PROGRAM.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GrowthLab on TikTok"
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <SiTiktok className="size-[18px]" aria-hidden />
            </a>
          </div>

          <p className="kicker mt-8 text-ink-3">
            © {new Date().getFullYear()} {PROGRAM.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
