import { resolveBearId, useBearId } from '@hooks';
import type { SvgAssetProps } from './SvgAsset.types';

export function SvgAsset(props: SvgAssetProps) {
  const { src, alt, width, height, id, testId } = props;
  const generatedId = useBearId('SvgAsset');
  const domId = resolveBearId(id, generatedId);

  return (
    <img
      id={domId}
      data-testid={testId}
      className="Bear-SvgAsset"
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
}
