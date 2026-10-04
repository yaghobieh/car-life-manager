import { ZERO } from '@const';
import type { HomePanoramaProps } from '../HomeCard.types';

const panoramaOffset = new WeakMap<HTMLCanvasElement, number>();
const panoramaSource = new WeakMap<HTMLCanvasElement, string>();

function offsetOf(canvas: HTMLCanvasElement): number {
  return panoramaOffset.get(canvas) ?? ZERO;
}

function paint(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext('2d');
  if (!context || !image.width) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  const slice = image.width;
  const start = ((offsetOf(canvas) % slice) + slice) % slice;
  const leftWidth = width * ((slice - start) / slice);
  context.drawImage(image, start, ZERO, slice - start, image.height, ZERO, ZERO, leftWidth, height);
  context.drawImage(image, ZERO, ZERO, start, image.height, leftWidth, ZERO, width - leftWidth, height);
}

export function HomePanorama(props: HomePanoramaProps) {
  const { src, label } = props;

  function bind(node: HTMLCanvasElement | null) {
    if (!node || panoramaSource.get(node) === src) return;
    panoramaSource.set(node, src);
    panoramaOffset.set(node, ZERO);
    const image = new Image();
    const drag = { active: false, x: ZERO };
    image.onload = () => paint(node, image);
    image.crossOrigin = 'anonymous';
    image.src = src;
    node.onpointerdown = (event) => {
      drag.active = true;
      drag.x = event.clientX;
      node.setPointerCapture(event.pointerId);
    };
    node.onpointermove = (event) => {
      if (!drag.active) return;
      panoramaOffset.set(node, offsetOf(node) + (drag.x - event.clientX));
      drag.x = event.clientX;
      paint(node, image);
    };
    node.onpointerup = () => {
      drag.active = false;
    };
  }

  return <canvas ref={bind} className="Bear-HomePanorama" aria-label={label} />;
}
