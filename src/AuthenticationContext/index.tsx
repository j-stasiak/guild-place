import { createContext, useEffect } from "react";

import { useGetUserInfoQuery } from "./useGetUserInfo";

export type User = { email: string; role: string; _id: string; avatar: string };

type UserContext = {
  user?: User;
};

export const AuthenticationContext = createContext<UserContext>({
  user: { email: "", role: "none", _id: "", avatar: "" },
});

type UserContextProps = UserContext & {
  setUser: (user: User | undefined) => void;
};

export const AuthenticationProvider: React.FC<UserContextProps> = ({
  user,
  setUser,
  children,
}) => {
  const query = useGetUserInfoQuery();

  useEffect(() => {
    if (query.isSuccess) {
      setUser(query.data.data);
    }
  }, [query, setUser]);

  return (
    <AuthenticationContext.Provider value={{ user: user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
