import Image from "next/image";
import { Award, CalendarDays, ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/types";

interface CertificationCardProps {
  certification: Certification;
  titleId: string;
}

function CertificationCard({
  certification,
  titleId,
}: CertificationCardProps) {
  return (
    <article aria-labelledby={titleId} className="h-full">
      <Card interactive={Boolean(certification.credentialUrl)} className="h-full gap-0 py-0">
        {certification.image ? (
          <div className="aspect-[16/10] overflow-hidden border-b border-border bg-muted">
            <Image
              src={certification.image.src}
              alt={certification.image.alt}
              width={certification.image.width}
              height={certification.image.height}
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <CardHeader className="pt-6">
          <span className="mb-4 flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Award aria-hidden="true" className="size-5" />
          </span>
          <h3 id={titleId}>{certification.name}</h3>
          {certification.issuer.trim() ? (
            <p className="mt-2 font-medium text-muted-foreground">
              {certification.issuer}
            </p>
          ) : null}
        </CardHeader>

        <CardContent className="flex flex-1 flex-col pb-6">
          {certification.issueDate?.trim() ||
          certification.expirationDate?.trim() ? (
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <CalendarDays
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-primary"
              />
              <span>
                {certification.issueDate?.trim() ? (
                  <time dateTime={certification.issueDate}>
                    Issued {certification.issueDate}
                  </time>
                ) : null}
                {certification.issueDate?.trim() &&
                certification.expirationDate?.trim() ? (
                  <span aria-hidden="true"> · </span>
                ) : null}
                {certification.expirationDate?.trim() ? (
                  <time dateTime={certification.expirationDate}>
                    Expires {certification.expirationDate}
                  </time>
                ) : null}
              </span>
            </p>
          ) : null}

          {certification.credentialId?.trim() ? (
            <dl className="mt-4">
              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Credential ID
              </dt>
              <dd className="mt-1 break-all text-sm text-card-foreground">
                {certification.credentialId}
              </dd>
            </dl>
          ) : null}

          {certification.description?.trim() ? (
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {certification.description}
            </p>
          ) : null}

          {certification.credentialUrl ? (
            <div className="mt-auto pt-6">
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${certification.name} credential (opens in a new tab)`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                View Credential
                <ExternalLink aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </article>
  );
}

export function Certifications() {
  if (certifications.length === 0) {
    return null;
  }

  return (
    <Section
      id="certifications"
      surface="muted"
      aria-labelledby="certifications-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          headingId="certifications-heading"
          description="Verified certifications and professional credentials."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((certification, index) => (
            <li key={`${certification.issuer}-${certification.name}`}>
              <CertificationCard
                certification={certification}
                titleId={`certification-${index}-title`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
