export interface DocumentsDownloadActionProps {
  hasFile: boolean;
  busy: boolean;
  downloadLabel: string;
  onDownload: () => void;
}

export interface DocumentsRowActionsProps extends DocumentsDownloadActionProps {
  removeLabel: string;
  onRemove: () => void;
}
