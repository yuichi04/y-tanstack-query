import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SetStateAction } from "react";

const Post = ({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: React.Dispatch<SetStateAction<number>>;
}) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      return data;
    },
    enabled: !!postId,
  });

  if (error) {
    return <div>エラーが発生しました。</div>;
  }

  return (
    <div>
      <div>
        <a href="#" onClick={() => setPostId(-1)}>
          戻る
        </a>
      </div>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
