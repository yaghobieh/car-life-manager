---
name: apartment-code-quality
description: Property / apartment (NadLife) code quality — official-or-nothing, empty states, no fake listings, same Bear/CLM file rules as car-code-quality. Use when reviewing or writing /property pages.
---

# Apartment / Property Code Quality

Follow **car-code-quality** first (types in `*.types.ts`, constants in `@const` / `*.const.ts`, no magic numbers/strings, no unjustified hooks, named exports, Bear/Clm primitives).

## Product rules

- Property is an OS for apartment life, not a listings site
- No mock apartments, lawyers, maps, or marketplace cards
- Do not mark Israel Land Authority, Tabu, or any commercial source as connected without a real API
- Empty states must say there is no official source yet
- Search inputs may exist; results come only from the official data.gov.il city/street adapter, or stay empty/error if that API fails
- Do not reuse `vehicleId` for property records

## Layout

- Pages: `pages/Property/Name/Name.tsx` plus barrel
- Shell: `PropertyShell` + `Clm-*` chrome, accent `#2F6BFF`
- Copy via Lingo (`he` default)
- Product routes: `/property`, `/apartment` (alias), host `apartment.homelife.app`

## Checklist

- [ ] Types in `*.types.ts`
- [ ] Strings/numbers in `@const` or feature `*.const.ts`
- [ ] No fake listings or “connected” badges
- [ ] Empty official-or-nothing copy
- [ ] Named exports only
- [ ] No `useEffect` / `useCallback` / `useMemo` unless required
