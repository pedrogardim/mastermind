const LOCAL_STORAGE_KEY = "mastermind";

export const pushToStorage = (newEntry) => {
  const storedStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  const storageEntries = JSON.parse(storedStr || "[]");
  storageEntries.push(newEntry);
  console.log(storageEntries);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageEntries));
};

export const readStorage = () =>
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]")
    .sort((a, b) => a.time - b.time)
    .slice(0, 10);
