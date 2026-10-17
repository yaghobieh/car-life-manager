import { useState } from 'react';
import { Input, Select } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { DocumentType } from '@clm/shared';
import { api } from '@api';
import {
  DOCUMENT_TYPE_LICENSE,
  EMPTY_STRING,
  SVG_EMPTY_DOCUMENT,
  ZERO,
} from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow } from '@common';
import { useAppState } from '@hooks';
import { DOCUMENT_TYPE_OPTIONS } from './Documents.const';

export function Documents() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const documents = dashboard?.documents ?? [];
  const [showForm, setShowForm] = useState(documents.length > ZERO);
  const [type, setType] = useState<string>(DOCUMENT_TYPE_LICENSE);
  const [title, setTitle] = useState(EMPTY_STRING);
  const [expiresAt, setExpiresAt] = useState(EMPTY_STRING);
  const [notes, setNotes] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);

  async function submit() {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.addDocument(currentId, {
        type: type as DocumentType,
        title,
        expiresAt: expiresAt || null,
        notes: notes || null,
      });
      setTitle(EMPTY_STRING);
      setExpiresAt(EMPTY_STRING);
      setNotes(EMPTY_STRING);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="Bear-Documents">
      <ClmPageHead title={t('documents')} subtitle={t('pageSubDocuments')} />
      {documents.length === ZERO && !showForm ? (
        <ClmEmpty
          iconSrc={SVG_EMPTY_DOCUMENT}
          title={t('noDocumentsTitle')}
          body={t('noDocumentsBody')}
          action={<ClmButton onClick={() => setShowForm(true)}>{t('uploadDocument')}</ClmButton>}
        />
      ) : (
        <>
          {documents.length > ZERO && (
            <ClmList>
              {documents.map((document) => (
                <ClmRow
                  key={document.id}
                  iconSrc={SVG_EMPTY_DOCUMENT}
                  title={document.title}
                  subtitle={[t(`documentType_${document.type}`), document.expiresAt].filter(Boolean).join(' · ')}
                />
              ))}
            </ClmList>
          )}
          <div className="Clm-form">
            <Select
              label={t('category')}
              value={type}
              onChange={setType}
              fullWidth
              options={DOCUMENT_TYPE_OPTIONS.map((value) => ({
                value,
                label: t(`documentType_${value}`),
              }))}
            />
            <Input label={t('title')} value={title} onChange={(event) => setTitle(event.target.value)} fullWidth />
            <Input label={t('expiresAt')} type="date" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} fullWidth />
            <Input label={t('notes')} value={notes} onChange={(event) => setNotes(event.target.value)} fullWidth />
            <ClmButton disabled={busy} onClick={() => void submit()}>{busy ? t('saving') : t('uploadDocument')}</ClmButton>
          </div>
        </>
      )}
    </div>
  );
}
