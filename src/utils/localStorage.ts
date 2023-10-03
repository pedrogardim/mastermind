const STORAGE_KEY = "mastermindRanking";
const COLORS_KEY = "mastermindColors";

export type GameEntry = {
  userName: string;
  rounds: number;
  time: number;
  difficulty: number;
};

export const pushGameEntryToStorage = (newEntry: GameEntry) => {
  const storedStr = localStorage.getItem(STORAGE_KEY);
  const storageEntries = JSON.parse(storedStr || "[]");
  storageEntries.push(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageEntries));
};

export const readRankingFromStorage = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    .sort((a: GameEntry, b: GameEntry) => a.time - b.time)
    .slice(0, 10);

export const saveColorsToStorage = (colors: string[]) => {
  localStorage.setItem(COLORS_KEY, JSON.stringify(colors));
};

export const readColorsFromStorage = () =>
  JSON.parse(localStorage.getItem(COLORS_KEY) || "[]");
