import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY, TITLE_SEPARATOR, ZERO } from '@const';
import { ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { usePropertyState } from '@hooks';
import { PropertyLawyersForm } from './PropertyLawyers.form';

function lawyerSubtitle(city: string | null, specialty: string | null, phone: string | null): string | undefined {
  const parts = [city, specialty, phone].filter(Boolean);
  return parts.length ? parts.join(TITLE_SEPARATOR) : undefined;
}

export function PropertyLawyers() {
  const t = useTranslate();
  const { lawyers } = usePropertyState();

  return (
    <div className="Bear-PropertyLawyers">
      <ClmPageHead title={t('propertyLawyers')} subtitle={t('pageSubPropertyLawyers')} />
      <PropertyLawyersForm />
      {lawyers.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('lawyersEmptyTitle')}
          body={t('lawyersEmptyBody')}
        />
      ) : (
        <ClmList>
          {lawyers.map((lawyer) => (
            <ClmRow
              key={lawyer.id}
              title={lawyer.name}
              subtitle={lawyerSubtitle(lawyer.city, lawyer.specialty, lawyer.phone) ?? lawyer.notes ?? undefined}
            />
          ))}
        </ClmList>
      )}
    </div>
  );
}
