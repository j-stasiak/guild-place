import { Endpoints } from "../../consts/endpoints";
import axios from "axios";
import { useMutation } from "react-query";

export type TUser = {
  _id: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

type TUserSignUpData = {
  email: string;
  password: string;
  role: string;
};

const createUser = async (data: TUserSignUpData) => {
  try {
    const response = await axios.post<TUser>(
      `${Endpoints.POST_CREATE_USER}`,
      data
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const useSignUpMutation = () =>
  useMutation(async (data: TUserSignUpData) => await createUser(data));
