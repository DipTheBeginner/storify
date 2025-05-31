import { useState } from "react";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(42);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <button
      onClick={toggleLike}
      className="flex items-center space-x-1 px-2 py-1 rounded-md 
                 bg-red-100 hover:bg-red-200 text-red-600 text-sm focus:outline-none"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
            4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
            3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
              4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 
              3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
      <span className="font-medium">{likes}</span>
    </button>
  );
}
