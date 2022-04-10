import { useMutation, useQueryClient } from "react-query";

import { Endpoints } from "../../../consts/endpoints";
import axios from "axios";
import { forumPostKeys } from "../../../hooks/api/queryKeys";

type TCreateForumPost = {
  title: string;
  message: string;
};

type TForumPostResponse = {
  _id: string;
  title: string;
  message: string;
  author: string;
};

const createNewPost = async (data: TCreateForumPost) => {
  try {
    const response = await axios.post<TForumPostResponse>(
      `${Endpoints.CREATE_POST}`,
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

export const useCreateNewPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: TCreateForumPost) => await createNewPost(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(forumPostKeys.list);
      },
    }
  );
};
