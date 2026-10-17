import type React from 'react';
import type {
  AddressSuggestion,
  WebApartmentItem,
  WebCarItem,
} from '../../Landing.types';

export interface LandingHeroProps {
  smartQuery: string;
  setSmartQuery: (q: string) => void;
  searchFocused: boolean;
  setSearchFocused: (f: boolean) => void;
  searchBoxRef: React.RefObject<HTMLDivElement>;
  onSmartSearchSubmit: (e: React.FormEvent) => void;
  handleSmartSearch: (q: string) => void;
  cities: string[];
  apartments: WebApartmentItem[];
  cars: WebCarItem[];
  addressSuggestions: AddressSuggestion[];
  onSelectAddress: (addr: AddressSuggestion) => void;
  heroTab: 'apt' | 'car';
  setHeroTab: (t: 'apt' | 'car') => void;
  heroDeal: string;
  setHeroDeal: (d: string) => void;
  heroCity: string;
  setHeroCity: (c: string) => void;
  heroRooms: string;
  setHeroRooms: (r: string) => void;
  heroMaxPrice: string;
  setHeroMaxPrice: (p: string) => void;
  heroMaker: string;
  setHeroMaker: (m: string) => void;
  heroYear: string;
  setHeroYear: (y: string) => void;
  heroFuel: string;
  setHeroFuel: (f: string) => void;
  makers: string[];
  handleHeroSearch: () => void;
  goTo: (path: string) => void;
}
