import SelectBook from "@/components/select-book";
import { NYTBookApiResponse, SimplifiedBook } from "@/models";

export default async function Home() {
  const books: SimplifiedBook[] = await fetch(
    `https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=${process.env.API_KEY}`,
    {
      next: {
        revalidate: 86400, // 24 hours
      },
    }
  )
    .then(res => res.json())
    .then((data: NYTBookApiResponse) => {
      return data.results.map(book => {
        return {
          title: book.book_details[0]?.title,
          author: book.book_details[0]?.author,
        };
      });
    });

  return <SelectBook books={books} />;
}
