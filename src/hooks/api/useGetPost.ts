import { Endpoints } from "../../consts/endpoints";
import axios from "axios";
import { forumPostKeys } from "./queryKeys";
import { useQuery } from "react-query";

export type TPostComment = Omit<TPost, "title" | "replies">;

export type TPost = {
  _id: string;
  title: string;
  message: string;
  author: any;
  createdAt: string;
  edited: boolean;
  replies: TPostComment[];
};

const getPost = async (id: string) => {
  try {
    const response = await axios.get<TPost>(`${Endpoints.GET_POSTS}/${id}`);

    return response.data;
  } catch (error) {
    return error as any;
  }
};

export const useGetForumPost = (id?: string) =>
  useQuery(forumPostKeys.details(id!), async () => await getPost(id!));
