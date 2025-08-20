import { useEffect, useState } from "react";
import { addBookmark, getBookmarks, deleteBookmark } from "../db/bookmark";
import type { Bookmark } from "../Types/bookmark";

export default function Popup() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    const data = await getBookmarks();
    setBookmarks(data);
  }

  async function saveCurrentTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (tab?.title && tab?.url) {
        await addBookmark(tab.title, tab.url);
        loadBookmarks();
      }
    });
  }

  async function removeBookmark(id: number) {
    await deleteBookmark(id);
    loadBookmarks();
  }

  return (
    <div style={{ width: "280px", padding: "10px", fontFamily: "sans-serif" }}>
      <h3>Offline Bookmarks</h3>
      <button onClick={saveCurrentTab}>Save Current Tab</button>
      <ul>
        {bookmarks.map((bm) => (
          <li key={bm.id}>
            <a href={bm.url} target="_blank" rel="noreferrer">
              {bm.title}
            </a>
            <button onClick={() => removeBookmark(bm.id!)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
