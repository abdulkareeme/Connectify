import axios from "axios";
import GridPostsList from "../components/GridPostsList";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const token = Cookies.get("userToken") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const getSearchResults = async () => {
    setIsLoading(true);
    try {
      const res = await axios(
        `https://abdulkareem3.pythonanywhere.com/social/search/${searchQuery}/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
    finally {
        setIsLoading(false)
    }
  };
  const [inputValue, setInputValue] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.length > 0) {
      handleSearchSubmit(inputValue);
    }
  };

  const { data: results } = useSWR(
    searchQuery ? `/search_results_${searchQuery}` : null,
    getSearchResults
  );

  const handleSearchSubmit = (query) => {
    console.log("query", query);
    setSearchQuery(query);
  };
  return (
    <div className="px-5 py-10 w-full">
      <div className="flex justify-between items-center w-full">
        <h1>Search</h1>
        {/* Search Bar */}
        <div
          className={`relative flex items-center text-[25px] p-[5px_15px] max-w-[600px] rounded-[20px] bg-[#efefef]`}
        >
          <input
            id={"input-search"}
            type="text"
            placeholder="Search.."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            className="w-full h-full p-[8px] border-none text-[17px] text-[#000] caret-[#000] outline-none bg-transparent"
          />
          <FaSearch
            onClick={() => {
              inputValue.length > 0 && handleSearchSubmit(inputValue);
            }}
            className="text-[25px] text-[#000] cursor-pointer"
          />
        </div>
      </div>
      <GridPostsList posts={results} isLoading={isLoading} />
    </div>
  );
};

export default Search;
