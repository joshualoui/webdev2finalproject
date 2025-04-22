"use client";
import SearchBar from "./components/searchbar";
import { useEffect, useState } from "react";
import fetchCards from "./components/cards";
import api from "./lib/queryBuilder";
import axios from "axios";
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //display 10 cards on 1 page and change each search or page change

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchCards(searchTerm, page, 20).then(({ cards, totalCount }) => {
        setCards(cards);
        setTotalPages(Math.ceil(totalCount / 20));
      });
    } else {
      setCards([]);
      setPage(1);
      setTotalPages(1);
    }
  }, [searchTerm, page]);

  //reset the page to 1 when the search term changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/latias.jpg')" }}
    >
      <h1 className="font-extrabold p-4 text-center text-yellow-300 shadow-blue-700 text-6xl text-shadow-blue-900 text-shadow-lg">
        Pokémon TCG Display
      </h1>

      <div className="flex items-center justify-between mt-10 mb-4 px-4">
        <div className="w-1/3" />
        <div className="w-1/3 flex justify-center">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className="w-1/3 flex justify-end text-slate-900">
          Page {page} of {totalPages}
        </div>
      </div>

      <div className="text-center font-semibold text-slate-900 mb-4 pt-7">
        <p>
          Hint exact match searching only. Spelling matters {" ("}Ex. Pikachu
          {")"}
        </p>
        <p>However you can:</p>
        <p>
          {
            '1) Search for any card that starts with "Pi" use " * " afterwards (Ex. "Pi*")'
          }
        </p>
        <p>
          {
            '2) Search for any card that starts with "Pi" and ends with "o" (Ex. "Pi*o")'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {cards.map((card) => (
          <div key={card.id}>
            <p className="mb-2 text-yellow-300 bg-slate-700 rounded-lg text-center font-bold text-2xl">
              {card.name}
            </p>
            <img
              src={card.images.large}
              className="w-full duration-300 hover:scale-125"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-4 mb-4 ">
        <button
          className={`p-2 m-2 rounded-lg  bg-blue-700  w-1/12 border-2 border-black ${
            page === 1 ? "opacity-50 cursor-not-allowed" : " hover:bg-blue-500"
          }`}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className={`p-2 m-2 rounded-lg bg-blue-700 w-1/12 border-2 border-black ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : " hover:bg-blue-500"
          }`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}
