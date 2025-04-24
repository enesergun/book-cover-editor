import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SimplifiedBook } from "@/models";
import { selectBook } from "@/actions/actions";

export default function SelectBook({ books }: { books: SimplifiedBook[] }) {
  return (
    <form
      action={selectBook}
      className="h-96 w-full mx-auto flex flex-col justify-center items-center"
    >
      <div className="h-96 w-full mx-auto flex flex-col justify-center items-center">
        <Select>
          <SelectTrigger className="w-3/7">
            <SelectValue placeholder="Select book to edit cover page" />
          </SelectTrigger>
          <SelectContent>
            {books.map(book => (
              <SelectItem key={`index_${book.title}`} value={`${book.title};${book.author}`}>
                <input type="hidden" name="book" value={book.title} />
                <input type="hidden" name="author" value={book.author} />
                {book.title} by {book.author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Next</Button>
    </form>
  );
}
