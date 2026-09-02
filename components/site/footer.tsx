import { Logo } from "./logo";
import { Container, Kicker } from "./primitives";
import { PROGRAM } from "./data";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink bg-paper py-12">
      <Container>
        <div className="grid gap-8 border-b border-ink/15 pb-8 sm:grid-cols-12">
          <div className="sm:col-span-5">
            <Logo className="h-12 w-auto sm:h-14" />
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-ink-2">
              {PROGRAM.tagline}. {PROGRAM.program}, run as a simulated agency.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:col-span-7 sm:grid-cols-3">
            {[
              ["Cohort", `01 · ${PROGRAM.dates}`],
              ["Format", PROGRAM.format],
              ["Price", `$${PROGRAM.price}`],
              ["Schedule", "Mon & Wed, 6–8 PM"],
              ["Live hours", `${PROGRAM.liveHours}h · ${PROGRAM.trainings} sessions`],
              ["Contact", PROGRAM.contactPhone],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-ink/15 pt-2">
                <dt className="kicker text-ink-3">{k}</dt>
                <dd className="mt-1 text-[13px] font-medium tracking-tight text-ink">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6">
          <Kicker className="text-ink-3">
            © {new Date().getFullYear()} {PROGRAM.name}
          </Kicker>
        </div>
      </Container>
    </footer>
  );
}
