import React, { useState, useEffect } from "react";
import { Pagination } from "antd";

import ImageCard from "./components/image-card.js";
import SearchForm from "./components/search-form.js";

function App() {
  const [images, setImages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchQuery}&image_type=photo&page=${pageNum}&per_page=${itemsPerPage}&safesearch=true`
        );
        const data = await res.json();

        setImages(data.hits);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [searchQuery, pageNum, itemsPerPage]);

  function search(term) {
    const t = term.trim();
    setSearchQuery(t);
  }

  return (
    <div className="container mx-auto px-6 pb-6">
      <SearchForm search={search} />

      {isLoading === false && images.length === 0 && (
        <p className="text-3xl font-semibold text-gray-800">No Images Found!</p>
      )}

      {isLoading ? (
        <p className="text-3xl font-semibold text-gray-800">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>

          <div className="w-full mx-auto mt-8 text-center">
            <Pagination
              current={pageNum}
              pageSize={itemsPerPage}
              total={200}
              onChange={(page, pageSize) => setPageNum(page)}
              onShowSizeChange={(current, size) => setItemsPerPage(size)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
