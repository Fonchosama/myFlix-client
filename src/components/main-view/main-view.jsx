import { useState } from 'react';
import { BookCard } from '../movie-card/movie-card';
import { BookView } from '../movie-view/movie-view';

export const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'Eloquent JavaScript',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51InjRPaF7L._SX377_BO1,204,203,200_.jpg',
      author: 'Marijn Haverbeke',
      {"_id":{"$oid":"66e73d58dbe8e5c391c73bfa"},"Title":"Interstellar","Description":"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.","Genre":{"Name":"Science Fiction","Description":"A genre that explores imaginative and futuristic concepts, often involving advanced technology, space exploration, time travel, and extraterrestrial life. Sci-fi films challenge the boundaries of possibility and frequently address philosophical or ethical issues through speculative scenarios."},"Director":{"Name":"Christopher Nolan","Bio":"A British-American filmmaker known for his cerebral, nonlinear storytelling and innovative visual style. He is celebrated for movies like \"Inception,\" \"The Dark Knight,\" and \"Interstellar.\"","Birth":"1970","Death":"N/A"},"ImagePath":"Interstellar.jpg","Featured":"true"}
    },
    {
      id: 2,
      title: 'Mastering JavaScript Functional Programming',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51WAikRq37L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
      author: 'Federico Kereki',
    },
    {
      id: 3,
      title: 'JavaScript: The Good Parts',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX381_BO1,204,203,200_.jpg',
      author: 'Douglas Crockford',
    },
    {
      id: 4,
      title: 'JavaScript: The Definitive Guide',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51HbNW6RzhL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
      author: 'David Flanagan',
    },
    {
      id: 5,
      title: 'The Road to React',
      image:
        'https://images-na.ssl-images-amazon.com/images/I/41MBLi5a4jL._SX384_BO1,204,203,200_.jpg',
      author: 'Robin Wieruch',
    },
  ]);

  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
