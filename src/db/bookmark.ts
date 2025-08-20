import { db } from "./db";
import type { Bookmark } from "../Types/bookmark";

export async function addBookmark(title: string, url: string) {
  return db.bookmarks.add({
    title,
    url,
    createdAt: new Date()
  });
}

export async function getBookmarks(): Promise<Bookmark[]> {
  return db.bookmarks.orderBy("createdAt").reverse().toArray();
}

export async function deleteBookmark(id: number) {
  return db.bookmarks.delete(id);
}
