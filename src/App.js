import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Spin, BackTop, Alert } from "antd";

import ImageCard from "./components/image-card.js";
import SearchForm from "./components/search-form.js";

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
        <div className="mt-12 text-3xl font-semibold text-gray-800 text-center">
          <div className="example">
            <Spin size="large" />
          </div>
          Loading...
        </div>
      ) : (
        !err && (
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
        )
      )}

      <BackTop>
        <div className="bg-primary-light w-8 h-8 text-2xl text-gray-600 text-center rounded-full">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
      </BackTop>

      {/*error*/}
      <div className="absolute bottom-4 w-2/3">
        {err && <Alert type="error" message="Something went wrong!" banner />}
      </div>
    </div>
  );
}

export default App;
