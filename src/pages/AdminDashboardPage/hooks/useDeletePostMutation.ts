import { useMutation, useQueryClient } from "react-query";

import { Endpoints } from "../../../consts/endpoints";
import axios from "axios";
import { forumPostKeys } from "../../../hooks/api/queryKeys";

type TDeleteForumPost = {
  postId: string;
};

const deletePost = async (data: TDeleteForumPost) => {
  try {
    const response = await axios.delete(
      `${Endpoints.DELETE_POST}/${data.postId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(async (data: TDeleteForumPost) => await deletePost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(forumPostKeys.list);
    },
  });
};
