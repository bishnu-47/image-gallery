import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "antd";

import SearchForm from "./components/search-form.js";
import Loading from "./components/loading.js";
import Images from "./components/images.js";
import PaginationSection from "./components/pagination.js";

function App() {
  const [images, setImages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const URL = "https://pixabay.com/api/";
      const params = {
        key: process.env.REACT_APP_PIXABAY_API_KEY,
        page: pageNum,
        per_page: itemsPerPage,
        image_type: "photo",
        safesearch: true,
        q: searchQuery,
      };

      try {
        setIsLoading(true);

        const res = await axios.get(URL, { params });
        const data = res.data;
        setImages(data.hits);

        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setErr(true);
      }
    };

    fetchData();
  }, [searchQuery, pageNum, itemsPerPage]);

  function search(term) {
    const t = term.trim();
    setSearchQuery(t);
  }

  return (
    <div className="container mx-auto px-6 pb-6 h-screen relative">
      <SearchForm search={search} />

      {/*No Images Found*/}
      {isLoading === false && images.length === 0 && !err && (
        <p className="text-3xl font-semibold text-gray-800">No Images Found!</p>
      )}

      {/*Loading*/}
      {isLoading ? (
        <Loading size="large" />
      ) : (
        !err && (
          <>
            <Images images={images} />

            <PaginationSection
              pageNum={pageNum}
              itemsPerPage={itemsPerPage}
              setPageNum={setPageNum}
              setItemsPerPage={setItemsPerPage}
            />
          </>
        )
      )}

      {/*error*/}
      <div className="absolute bottom-4 w-2/3">
        {err && <Alert type="error" message="Something went wrong!" banner />}
      </div>
    </div>
  );
}

export default App;
