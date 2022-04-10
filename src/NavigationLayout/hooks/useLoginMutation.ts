import { Endpoints } from "../../consts/endpoints";
import { TUser } from "./useSignUpMutation";
import axios from "axios";
import { useMutation } from "react-query";

type TUserLoginData = {
  email: string;
  password: string;
};

const login = async (data: TUserLoginData) => {
  try {
    const response = await axios.post<TUser>(
      `${Endpoints.POST_LOGIN_USER}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const useLoginMutation = () =>
  useMutation(async (data: TUserLoginData) => await login(data));
