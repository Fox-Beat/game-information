
export interface GameInfo {
  gameName: string;
  provider: string;
  theme: string[];
  features: string[];
  volatility: number; // Scale from 1-8
  rtp: string; // e.g., "96.5%"
  lines: string; // Renamed from 'ways'
  reels: string; // e.g., "5x3" or "Cluster Pays"
}
