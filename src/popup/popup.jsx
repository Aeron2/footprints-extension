// import React, { useState } from "react";

// const Test = () => {
//   const [tags, setTags] = useState([]);
//   const [newTag, setNewTag] = useState("");
//   const [blok, setBlok] = useState("");

//   const predefinedTags = [
//     "Music",
//     "Podcasts",
//     "Artists",
//     "Albums",
//     "Radio",
//     "Charts",
//     "Playlists",
//     "Episodes",
//   ];

//   const handleAddTag = () => {
//     if (newTag.trim()) {
//       setTags([...tags, newTag]);
//       setNewTag("");
//     }
//   };

//   const handleCreateBookmark = () => {
//     // Logic to create a bookmark
//     console.log("Creating bookmark with tags:", tags, "and blok:", blok);
//   };

//   return (
//     <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <div className="text-xl font-medium text-black">Done</div>
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="Add a new tag"
//           value={newTag}
//           onChange={(e) => setNewTag(e.target.value)}
//           className="flex-grow p-2 border rounded"
//         />
//         <button
//           onClick={handleAddTag}
//           className="p-2 bg-blue-500 text-white rounded"
//         >
//           Add
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {predefinedTags.map((tag) => (
//           <button
//             key={tag}
//             className="px-3 py-1 bg-gray-200 rounded-full"
//             onClick={() => setTags([...tags, tag])}
//           >
//             {tag}
//           </button>
//         ))}
//       </div>
//       <div>
//         <select
//           value={blok}
//           onChange={(e) => setBlok(e.target.value)}
//           className="w-full p-2 border rounded"
//         >
//           <option value="">Add to a blok</option>
//           {/* Add your blok options here */}
//         </select>
//       </div>
//       <button
//         onClick={handleCreateBookmark}
//         className="w-full p-2 bg-blue-500 text-white rounded"
//       >
//         Create Bookmark
//       </button>
//     </div>
//   );
// };

// export default Test;
import React, { useState } from "react";

const Test = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [blok, setBlok] = useState("");
  const [progress, setProgress] = useState(false);
  const [saved, setSaved] = useState(false);

  const predefinedTags = [
    "Music",
    "Podcasts",
    "Artists",
    "Albums",
    "Radio",
    "Charts",
    "Playlists",
    "Episodes",
  ];

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleCreateBookmark = () => {
    setProgress(true); // Show in progress popup
    setTimeout(() => {
      setProgress(false); // Hide progress popup
      setSaved(true); // Show saved popup
      setTimeout(() => {
        window.close(); // Close the popup after saving
      }, 1500);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      {!progress && !saved && (
        <>
          <div className="text-xl font-medium text-black">Save Bookmark</div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add a new tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={handleAddTag}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {predefinedTags.map((tag) => (
              <button
                key={tag}
                className="px-3 py-1 bg-gray-200 rounded-full"
                onClick={() => setTags([...tags, tag])}
              >
                {tag}
              </button>
            ))}
          </div>
          <div>
            <select
              value={blok}
              onChange={(e) => setBlok(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Add to a blok</option>
              {/* Add your blok options here */}
            </select>
          </div>
          <button
            onClick={handleCreateBookmark}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Create Bookmark
          </button>
        </>
      )}
      {progress && (
        <div className="text-xl font-medium text-black">In Progress...</div>
      )}
      {saved && (
        <div className="text-xl font-medium text-black">Bookmark Saved!</div>
      )}
    </div>
  );
};

export default Test;
