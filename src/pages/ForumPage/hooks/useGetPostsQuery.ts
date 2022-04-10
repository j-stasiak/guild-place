import { Endpoints } from "../../../consts/endpoints";
import axios from "axios";
import { forumPostKeys } from "../../../hooks/api/queryKeys";
import { useQuery } from "react-query";

export type TPost = {
  _id: string;
  author: any;
  title: string;
  message: string;
  createdAt: string;
};

const getPosts = async () => {
  try {
    const response = await axios.get<TPost>(`${Endpoints.GET_POSTS}`);

    return response.data;
  } catch (error) {
    return error as any;
  }
};

export const useGetForumPostsQuery = () =>
  useQuery(forumPostKeys.list, async () => await getPosts());
