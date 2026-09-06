import { useState } from 'react';
import { Button, Card, Flex, Input, Select, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { DocumentType } from '@clm/shared';
import { api } from '@api';
import {
  CARD_RADIUS_XL,
  COLOR_MUTED,
  DOCUMENT_TYPE_LICENSE,
  EMPTY_STRING,
  FLEX_GAP_LG,
  FLEX_GAP_MD,
  FLEX_GAP_SM,
  ZERO,
} from '@const';
import { EmptyState } from '@components/EmptyState';
import { useAppState } from '@hooks';
import { DOCUMENT_TYPE_OPTIONS } from './Documents.const';

export function Documents() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const documents = dashboard?.documents ?? [];
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
    <Card className="Bear-Documents" variant="elevated" padding="lg" radius={CARD_RADIUS_XL}>
      <Flex direction="column" gap={FLEX_GAP_LG}>
        <Typography color={COLOR_MUTED}>{t('noDocumentsBody')}</Typography>
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
        <Button variant="primary" loading={busy} loadingText={t('saving')} onClick={() => void submit()}>
          {t('addDocument')}
        </Button>
        {documents.length === ZERO && <EmptyState title={t('noDocuments')} body={t('noDocumentsBody')} />}
        {documents.map((document) => (
          <Flex key={document.id} direction="column" gap={FLEX_GAP_SM}>
            <Typography weight="bold">{document.title}</Typography>
            <Typography color={COLOR_MUTED}>{t(`documentType_${document.type}`)}</Typography>
            {document.expiresAt && <Typography color={COLOR_MUTED}>{document.expiresAt}</Typography>}
            {document.notes && <Typography color={COLOR_MUTED}>{document.notes}</Typography>}
          </Flex>
        ))}
      </Flex>
    </Card>
  );
}
