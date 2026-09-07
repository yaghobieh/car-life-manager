import { useTranslate } from '@forgedevstack/lingo/react';
import { SVG_EMPTY_PROPERTY, ZERO } from '@const';
import { ClmEmpty, ClmPageHead } from '@common';
import { usePropertyState } from '@hooks';
import { PropertyLawyerCard } from './PropertyLawyerCard';
import { PropertyLawyersForm } from './PropertyLawyers.form';

export function PropertyLawyers() {
  const t = useTranslate();
  const { lawyers } = usePropertyState();

  return (
    <div className="Bear-PropertyLawyers">
      <ClmPageHead title={t('propertyLawyers')} subtitle={t('pageSubPropertyLawyers')} />
      <div className="Clm-card">
        <PropertyLawyersForm />
      </div>
      {lawyers.length === ZERO ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_PROPERTY}
          title={t('lawyersEmptyTitle')}
          body={t('lawyersEmptyBody')}
        />
      ) : (
        <div className="Clm-lawyers">
          {lawyers.map((lawyer) => (
            <PropertyLawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      )}
    </div>
  );
}
