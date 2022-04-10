import { AuthenticationContext } from "../../AuthenticationContext";
import { useContext } from "react";

export const Dashboard: React.FC = () => {
  const { user } = useContext(AuthenticationContext);

  return <div>Hello, {user?.email ?? "login to get started!"}</div>;
};
