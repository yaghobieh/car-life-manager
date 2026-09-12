export interface CalendarEventPageProps {
  id?: string;
  testId?: string;
}

export interface CalendarEventActionsProps {
  downloadLabel: string;
  googleLabel: string;
  onDownload: () => void;
  onGoogle: () => void;
}
