import { Box } from '@forgedevstack/bear';
import type { SettingsPhotoProps } from '../Settings.types';

export function SettingsPhoto(props: SettingsPhotoProps) {
  const { imageUrl, displayName, size } = props;
  if (!imageUrl) return null;
  return (
    <Box className="Bear-Settings__photo" rounded="full">
      <img src={imageUrl} alt={displayName} width={size} height={size} />
    </Box>
  );
}
