import { useState } from 'react';
import { Button, Input, Select, Typography } from '@forgedevstack/bear';
import { useTranslate } from '@forgedevstack/lingo/react';
import type { DocumentType } from '@clm/shared';
import { api } from '@api';
import {
  DOCUMENT_TYPE_LICENSE,
  EMPTY_STRING,
  SVG_EMPTY_DOCUMENT,
  ZERO,
} from '@const';
import { ClmButton, ClmEmpty, ClmList, ClmPageHead, ClmRow, ClmSectionTitle } from '@common';
import { useAppState } from '@hooks';
import { DOCUMENT_ACCEPT, DOCUMENT_TYPE_OPTIONS } from './Documents.const';
import { DocumentsRowActions } from './DocumentsRowActions';
import { fileToBase64, isAllowedDocumentSize, triggerBlobDownload } from './Documents.utils';

export function Documents() {
  const { dashboard, currentId, refresh } = useAppState();
  const t = useTranslate();
  const documents = dashboard?.documents ?? [];
  const [showForm, setShowForm] = useState(documents.length > ZERO);
  const [type, setType] = useState<string>(DOCUMENT_TYPE_LICENSE);
  const [title, setTitle] = useState(EMPTY_STRING);
  const [expiresAt, setExpiresAt] = useState(EMPTY_STRING);
  const [notes, setNotes] = useState(EMPTY_STRING);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState(EMPTY_STRING);

  async function download(documentId: string, fileName: string) {
    if (!currentId) return;
    const blob = await api.downloadDocument(currentId, documentId);
    triggerBlobDownload(blob, fileName);
  }

  async function remove(documentId: string) {
    if (!currentId) return;
    setBusy(true);
    try {
      await api.removeDocument(currentId, documentId);
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!currentId) return;
    if (file && !isAllowedDocumentSize(file.size)) {
      setErrorKey('fileTooLarge');
      return;
    }
    setBusy(true);
    setErrorKey(EMPTY_STRING);
    try {
      const contentBase64 = file ? await fileToBase64(file) : undefined;
      await api.addDocument(currentId, {
        type: type as DocumentType,
        title,
        expiresAt: expiresAt || null,
        notes: notes || null,
        fileName: file?.name,
        mimeType: file?.type,
        contentBase64,
      });
      setTitle(EMPTY_STRING);
      setExpiresAt(EMPTY_STRING);
      setNotes(EMPTY_STRING);
      setFile(null);
      await refresh();
    } catch {
      setErrorKey('unsupportedFileType');
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
                  subtitle={[
                    t(`documentType_${document.type}`),
                    document.expiresAt,
                    document.hasFile ? t('documentHasFile') : t('documentNoFile'),
                  ].filter(Boolean).join(' · ')}
                  action={(
                    <DocumentsRowActions
                      hasFile={document.hasFile}
                      busy={busy}
                      downloadLabel={t('downloadFile')}
                      removeLabel={t('removeDocument')}
                      onDownload={() => void download(document.id, document.originalName || document.title)}
                      onRemove={() => void remove(document.id)}
                    />
                  )}
                />
              ))}
            </ClmList>
          )}
          <div className="Clm-form-card">
            <ClmSectionTitle title={t('documentsFormTitle')} />
            <Typography>{t('documentProcessing')}</Typography>
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
            <div className="Clm-form-row">
              <Input label={t('expiresAt')} type="date" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} fullWidth />
              <label className="Clm-file">
                {file ? file.name : t('chooseFile')}
                <input
                  type="file"
                  accept={DOCUMENT_ACCEPT}
                  hidden
                  onChange={(event) => setFile(event.target.files?.[ZERO] ?? null)}
                />
              </label>
            </div>
            <Input label={t('notes')} value={notes} onChange={(event) => setNotes(event.target.value)} fullWidth />
            {errorKey ? <Typography role="alert">{t(errorKey)}</Typography> : null}
            <Button variant="primary" disabled={busy} onClick={() => void submit()}>
              {busy ? t('saving') : t('uploadDocument')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
