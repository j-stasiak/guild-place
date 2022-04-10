import React, { useContext, useEffect } from "react";

import { AuthenticationContext } from "../AuthenticationContext";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export const UserRoute: React.FC<{}> = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isEmpty(user?._id ?? "")) {
      navigate("/");
    }
  }, [navigate, user]);

  return <>{children}</>;
};

export const AdminRoute: React.FC<{}> = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (_.isEmpty(user?._id ?? "")) {
      navigate("/");
    }

    if (user?.role !== "admin") {
      navigate("/");
    }
  }, [navigate, user]);

  return <>{children}</>;
};
