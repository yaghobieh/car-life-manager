import { ClmButton } from '@common';
import { DocumentsDownloadAction } from './helpers/DocumentsDownloadAction';
import type { DocumentsRowActionsProps } from './Documents.types';

export function DocumentsRowActions(props: DocumentsRowActionsProps) {
  const { hasFile, busy, downloadLabel, removeLabel, onDownload, onRemove } = props;
  return (
    <div className="Clm-row-actions">
      <DocumentsDownloadAction
        hasFile={hasFile}
        busy={busy}
        downloadLabel={downloadLabel}
        onDownload={onDownload}
      />
      <ClmButton kind="outline" disabled={busy} onClick={onRemove}>
        {removeLabel}
      </ClmButton>
    </div>
  );
}
