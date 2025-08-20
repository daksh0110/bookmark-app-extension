import Dexie from "dexie";
import type { Table } from "dexie";
import type { Bookmark } from "../Types/bookmark";

export class BookmarkDB extends Dexie {
  bookmarks!: Table<Bookmark, number>; // <Entity, PrimaryKey>

  constructor() {
    super("BookmarkDB");

    this.version(1).stores({
      bookmarks: "++id,title,url,createdAt"
    });
  }
}

export const db = new BookmarkDB();
