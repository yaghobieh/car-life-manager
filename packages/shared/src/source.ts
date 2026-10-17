import type { DataProvenance, ServiceSource } from "./types";

export function sourceFromProvenance(provenance: DataProvenance): ServiceSource {
  if (provenance === "official" || provenance === "verified") return "official";
  if (provenance === "user") return "user";
  if (provenance === "calculated" || provenance === "estimated") return "calculated";
  return "unknown";
}
