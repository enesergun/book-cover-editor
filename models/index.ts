export interface NYTBookApiResponse {
  status: string;
  copyright: string;
  num_results: number;
  last_modified: string;
  results: NYTBookResult[];
}

export interface NYTBookResult {
  list_name: string;
  display_name: string;
  bestsellers_date: string;
  published_date: string;
  rank: number;
  rank_last_week: number;
  weeks_on_list: number;
  asterisk: number;
  dagger: number;
  amazon_product_url: string;
  isbns: ISBN[];
  book_details: BookDetail[];
  reviews: Review[];
}

export interface ISBN {
  isbn10: number;
  isbn13: string;
}

export interface BookDetail {
  title: string;
  description: string;
  contributor: string;
  author: string;
  contributor_note: string;
  price: number;
  age_group: string;
  publisher: string;
  primary_isbn13: string;
  primary_isbn10: number;
}

export interface Review {
  book_review_link: string;
  first_chapter_link: string;
  sunday_review_link: string;
  article_chapter_link: string;
}
export interface SimplifiedBook {
  title: string;
  author: string;
}
export interface StyleState {
  fontSize: number;
  color: string;
  letterSpacing: number;
}
