import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SetStateAction } from "react";

const queryClient = new QueryClient();

const Posts = ({
  setPostId,
}: {
  setPostId: React.Dispatch<SetStateAction<number>>;
}) => {
  const { data, isFetching, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    },
  });

  if (error) {
    <div>エラーが発生しました。</div>;
  }

  return (
    <div>
      <h1>ポスト一覧</h1>
      <div>
        {isFetching ? (
          <div>データ取得中</div>
        ) : (
          data.map((post: { id: number; title: string }) => (
            <p key={post.id}>
              <a
                href="#"
                onClick={() => setPostId(post.id)}
                style={
                  queryClient.getQueriesData(["post", post.id])
                    ? { fontWeight: "bold", color: "green" }
                    : {}
                }
              >
                {post.title}
              </a>
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
