import { create } from "zustand";
import { persist } from "zustand/middleware";
const useStoreToken = create(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token: token }),
    }),
    {
      name: "accessToken",
    }
  )
);

export default useStoreToken;
