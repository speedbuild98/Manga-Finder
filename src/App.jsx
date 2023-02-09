import React, { useState } from "react";
import axios from "axios";
import { BsSearch, BsGithub, BsLinkedin } from "react-icons/bs";

const App = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=${query}#json`
      );
      const items = response.data.results;
      const filteredItems = items
        .filter(
          (result) =>
            result.title.includes("Libro") ||
            result.title.includes("libro") ||
            result.title.includes("Vol") ||
            result.title.includes("vol") ||
            result.title.includes("manga")
        )
        .sort((a, b) => {
          const volumeA = parseInt(a.title.match(/\d+/)[0]);
          const volumeB = parseInt(b.title.match(/\d+/)[0]);
          return volumeA - volumeB;
        });
      setSearchResults(filteredItems);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#FFF159] flex items-center mb-5 p-5 justify-center relative"
      >
        <div className="flex gap-3 absolute left-4">
          <a target={"_blank"} href="https://github.com/speedbuild98/">
            <BsGithub className="bg-white text-slate-400 rounded-full w-7 h-7 transition ease-in-out hover:scale-[1.3] hover:text-amber-400"/>
          </a>
          <a target={"_blank"} href="https://www.linkedin.com/in/lautagallardogg/">
            <BsLinkedin className="bg-white text-slate-400 rounded-full w-7 h-7 transition ease-in-out hover:scale-[1.3] hover:text-amber-400"/>
          </a>
        </div>
        <input
          spellCheck="false"
          autoCapitalize="true"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca mangas"
          className="w-1/2 h-[39px] px-3 py-2 rounded-l-lg text-gray-700 outline-none"
        />
        <BsSearch
          onClick={handleSubmit}
          className="h-[39px] bg-white pr-2 w-6 cursor-pointer rounded-r-lg"
        />
      </form>
      <p className="mb-5">
        {searchResults.length > 0
          ? `Se encontraron ${searchResults.length} resultados.`
          : "No se encontraron resultados."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {searchResults.map((item) => (
          <a
            target={"_blank"}
            href={item.permalink}
            key={item.id}
            className="max-w-sm p-2 bg-white rounded-lg overflow-hidden shadow-lg flex transition ease-in-out hover:scale-[1.1] mx-5"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="min-w-[100px] min-h-[100px] w-10 h-10"
            />
            <div className="p-4">
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-gray-500 text-sm ">${item.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default App;
