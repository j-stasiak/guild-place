import { useMutation, useQueryClient } from "react-query";

import { Endpoints } from "../../../consts/endpoints";
import axios from "axios";
import { forumPostKeys } from "../../../hooks/api/queryKeys";

type TCreateReply = {
  postId: string;
  message: string;
};

type TForumPostResponse = {
  _id: string;
  title: string;
  message: string;
  author: string;
};

const createNewReply = async (data: TCreateReply) => {
  try {
    const response = await axios.post<TForumPostResponse>(
      `${Endpoints.CREATE_POST_REPLY.replace("{}", data.postId)}`,
      { message: data.message },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const useCreateReplyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: TCreateReply) => await createNewReply(data), {
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries(forumPostKeys.details(variable.postId));
    },
  });
};
