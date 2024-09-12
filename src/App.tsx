import { useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Post from "./components/Post";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const [postId, setPostId] = useState(-1);
  return (
    <QueryClientProvider client={queryClient}>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
