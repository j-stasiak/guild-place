// Import the Slate components and React plugin.
import { Editable, Slate, withReact } from "slate-react";
import React, { useMemo } from "react";
import { TPost, TPostComment } from "../../../../hooks/api/useGetPost";

import { Leaf } from "../Leaf";
import classnames from "classnames";
import { createEditor } from "slate";
import styles from "./styles.module.scss";

interface PostProps {
  data: TPost | TPostComment;
  className?: string;
}

export const Post: React.FC<PostProps> = ({ data, className }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div
      className={classnames(styles.commentWrapper, {
        [className as string]: !!className,
      })}
    >
      <div className={styles.authorArea}>
        <div className={styles.author}>
          <img src={data.author.avatar} alt={`${data.author.email}-avatar`} />
          <div className={styles.authorName}>{data.author.email}</div>
        </div>
        <div className={styles.creationTime}>{data.createdAt}</div>
      </div>
      <div className={styles.content}>
        <Slate editor={editor} value={JSON.parse(data.message)}>
          <Editable readOnly renderLeaf={(props) => <Leaf {...props} />} />
        </Slate>
      </div>
    </div>
  );
};
