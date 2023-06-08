export interface JSONData {
  user: string;
  password: string;
}

export interface modifiedJSONData {
  user: string;
  password: string;
  owned: string;
}

export const Superusers = [
  { email: "alimalikwayne@gmail.com" },
  { email: "bhninjayt@gmail.com" },
  { email: "hk687591@gmail.com" },
];

export const webDetails = {
  address: "https://waynegames.vercel.app"
}

export const generateID = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
