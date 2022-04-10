import { Endpoints } from "../../consts/endpoints";
import { TUser } from "./useSignUpMutation";
import axios from "axios";
import { useMutation } from "react-query";

const logout = async () => {
  try {
    const response = await axios.post<TUser>(
      `${Endpoints.POST_LOGOUT_USER}`,
      undefined,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const useLogoutMutation = () => useMutation(async () => await logout());
