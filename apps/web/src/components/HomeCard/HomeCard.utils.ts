import type { Home, HomeListedBy } from '@clm/shared';
import {
  EMPTY_STRING,
  FEATURE_AIRCON,
  FEATURE_BROKER,
  FEATURE_ELEVATOR,
  LISTED_BROKER,
  LISTED_PRIVATE,
  SPACE,
  SUBTITLE_SEPARATOR,
  TITLE_SEPARATOR,
} from '@const';

export function homeAddress(home: Home): string {
  const streetLine = [home.street, home.houseNumber].filter(Boolean).join(SPACE);
  const parts = [streetLine, home.neighborhood, home.city].filter(Boolean);
  return parts.join(SUBTITLE_SEPARATOR);
}

export function homeMeta(home: Home, roomsLabel: string, sqmLabel: string, floorLabel: string): string {
  const parts = [
    home.rooms ? `${home.rooms} ${roomsLabel}` : EMPTY_STRING,
    home.sqm ? `${home.sqm} ${sqmLabel}` : EMPTY_STRING,
    home.floor === null ? EMPTY_STRING : `${floorLabel} ${home.floor}`,
  ].filter(Boolean);
  return parts.join(TITLE_SEPARATOR);
}

export function homeHasFeature(home: Home, feature: string): boolean {
  return home.features.includes(feature);
}

export function listedByFromFeatures(features: string[]): HomeListedBy {
  return features.includes(FEATURE_BROKER) ? LISTED_BROKER : LISTED_PRIVATE;
}

export function featureLabelKey(feature: string): string {
  if (feature === FEATURE_ELEVATOR) return 'feature_elevator';
  if (feature === FEATURE_AIRCON) return 'feature_aircon';
  if (feature === FEATURE_BROKER) return 'feature_broker';
  return EMPTY_STRING;
}

export function mergeHomeFeatures(
  extra: string[],
  listedBy: string,
  elevator: boolean,
  aircon: boolean,
): string[] {
  const known = new Set([FEATURE_ELEVATOR, FEATURE_AIRCON, FEATURE_BROKER]);
  const next = extra.filter((feature) => !known.has(feature));
  if (listedBy === LISTED_BROKER) next.push(FEATURE_BROKER);
  if (elevator) next.push(FEATURE_ELEVATOR);
  if (aircon) next.push(FEATURE_AIRCON);
  return next;
}
