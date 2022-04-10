import { Endpoints } from "../consts/endpoints";
import { User } from ".";
import axios from "axios";
import { useQuery } from "react-query";

const getUserInfo = async () => {
  try {
    const response = await axios.get<User>(`${Endpoints.GET_USER_INFO}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return error as any;
  }
};

export const useGetUserInfoQuery = () =>
  useQuery("user", async () => await getUserInfo(), {
    retry: false,
  });
