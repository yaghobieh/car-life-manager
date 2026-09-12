import { ClmButton } from '@common';
import type { DocumentsDownloadActionProps } from '../Documents.types';

export function DocumentsDownloadAction(props: DocumentsDownloadActionProps) {
  const { hasFile, busy, downloadLabel, onDownload } = props;
  if (!hasFile) return null;
  return (
    <ClmButton kind="outline" disabled={busy} onClick={onDownload}>
      {downloadLabel}
    </ClmButton>
  );
}
