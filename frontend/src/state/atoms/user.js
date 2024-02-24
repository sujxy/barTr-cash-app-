import axios from "axios";
import { atom, selector } from "recoil";

export const tokenAtom = atom({
  key: "token",
  default: localStorage.getItem("token") || "",
});

const userSelector = selector({
  key: "userSelector",
  get: async ({ get }) => {
    const token = get(tokenAtom);
    if (token) {
      try {
        const { data } = await axios.get("/user");
        if (data.user) {
          return data.user;
        }
      } catch (e) {
        console.log("error while fetching user data" + e);
      }
    } else {
      console.log("no token found !");
      return undefined;
    }
  },
});

export const userAtom = atom({
  key: "user",
  default: userSelector,
});

export const allUsersAtom = atom({
  key: "allUser",
  default: [],
});
