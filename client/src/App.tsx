// client/src/App.tsx
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { Send, SquareX } from "lucide-react";

function App() {
  const [text, setText] = useState("");
  const utils = trpc.useUtils();

  const listQuery = trpc.input.list.useQuery();
  const submitMutation = trpc.input.submit.useMutation({
    onSuccess: () => {
      setText("");
      utils.input.list.invalidate();
    },
  });

  const deleteMutation = trpc.input.delete.useMutation({
    onSuccess: () => {
      utils.input.list.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    submitMutation.mutate({ text });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
  };

  return (
    <div className="bg-black text-white h-screen p-4">
      <h1 className="font-extrabold text-2xl border-b pb-2 mb-4">
        Simple Input App
      </h1>
      <form
        className="flex gap-2 justify-between mb-4 border rounded w-full p-2"
        onSubmit={handleSubmit}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter input..."
          className="w-full focus:outline-0"
        />
        <button className="cursor-pointer" type="submit">
          <Send className="w-6 h-6 text-green-500" />
        </button>
      </form>

      <ul className="overflow-auto h-[calc(100vh-168px)] scrollbar-hide">
        {listQuery.data?.map((item) => (
          <li
            className="flex justify-between gap-2 lg:gap-6 border-b border-gray-500 p-2 hover:bg-gray-950"
            key={item.id}
          >
            <p className="line-clamp-1 w-full">{item.text}</p>
            <button
              onClick={() => handleDelete(item.id)}
              className="cursor-pointer"
            >
              <SquareX className="text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
