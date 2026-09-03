import { Mail } from "lucide-react";
import { SiInstagram, SiTiktok, SiWhatsapp } from "react-icons/si";
import { Logo } from "./logo";
import { Container } from "./primitives";
import { PROGRAM } from "./data";

const whatsappHref = `https://wa.me/${PROGRAM.whatsappNumber}?text=${encodeURIComponent(
  PROGRAM.whatsappMessage,
)}`;

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-paper py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          {/* brand */}
          <div>
            <Logo className="h-12 w-auto sm:h-14" />
            <p className="kicker mt-5 text-ink-3">
              © {new Date().getFullYear()} {PROGRAM.name}
            </p>
          </div>

          {/* follow */}
          <div>
            <p className="kicker text-ink-3">Follow us</p>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href={PROGRAM.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowthLab on Instagram"
                className="inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-ink transition-colors hover:text-orange"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink">
                  <SiInstagram className="size-[15px]" aria-hidden />
                </span>
                Instagram
              </a>
              <a
                href={PROGRAM.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GrowthLab on TikTok"
                className="inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-ink transition-colors hover:text-orange"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink">
                  <SiTiktok className="size-[15px]" aria-hidden />
                </span>
                TikTok
              </a>
            </div>
          </div>

          {/* contact */}
          <div>
            <p className="kicker text-ink-3">Contact us</p>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Chat with GrowthLab on WhatsApp at ${PROGRAM.contactPhone}`}
                className="inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-ink transition-colors hover:text-orange"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink">
                  <SiWhatsapp className="size-[15px]" aria-hidden />
                </span>
                {PROGRAM.contactPhone}
              </a>
              <a
                href={`mailto:${PROGRAM.email}`}
                className="inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-ink transition-colors hover:text-orange"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink/[0.06] text-ink">
                  <Mail className="size-[15px]" strokeWidth={2} aria-hidden />
                </span>
                {PROGRAM.email}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
