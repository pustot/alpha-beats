// import { PronunciationData } from "../types/pronunciation";

export const fetchData = async (path) => {
  // change fetching from public url to github.io/public
  // const response = await fetch(process.env.PUBLIC_URL + path);
  const response = await fetch(path, { mode: 'cors' });
  const data = await response.text();
  return data
    .trimEnd()
    .split("\n")
    .map((line) => line.split("\t"));
};

// export const promiseDataSmall = fetchData("/data/data_small.tsv");
// export const promiseDataLarge = fetchData("/data/data_large.tsv");
