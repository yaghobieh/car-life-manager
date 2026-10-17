import { useTranslate } from '@forgedevstack/lingo/react';
import type { Lawyer } from '@clm/shared';
import { TITLE_SEPARATOR } from '@const';
import { lawyerInitials } from '../Property.utils';

export function PropertyLawyerCard(props: { lawyer: Lawyer }) {
  const { lawyer } = props;
  const t = useTranslate();
  const spec = [lawyer.specialty, lawyer.city].filter(Boolean).join(TITLE_SEPARATOR);

  return (
    <article className="Clm-lawyer">
      <div className="Clm-lawyer-top">
        <div className="Clm-lawyer-avatar">{lawyerInitials(lawyer.name)}</div>
        <div>
          <div className="Clm-lawyer-name">{lawyer.name}</div>
          <div className="Clm-lawyer-spec">{spec || t('sourceUser')}</div>
        </div>
      </div>
      {lawyer.phone ? <p className="Clm-lawyer-phone">{lawyer.phone}</p> : null}
      {lawyer.notes ? <p className="Clm-page-sub">{lawyer.notes}</p> : null}
    </article>
  );
}
