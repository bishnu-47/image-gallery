import React, { useContext, useEffect } from "react";
import axios from "axios";

import { AppContext } from "../store/app-context-provider";
import ImageCard from "./image-card.js";

const Images = () => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      const URL = "https://pixabay.com/api/";
      const params = {
        key: process.env.REACT_APP_PIXABAY_API_KEY,
        page: appCtx.pageNum,
        per_page: appCtx.itemsPerPage,
        image_type: "photo",
        safesearch: true,
        q: appCtx.searchQuery,
      };

      try {
        appCtx.setIsLoading(true);

        const res = await axios.get(URL, { params });
        const data = res.data;
        appCtx.setData(data.hits);

        appCtx.setIsLoading(false);
      } catch (e) {
        console.log(e);
        appCtx.setIsLoading(false);
        appCtx.setErr(true);
      }
    };

    fetchData();
  }, [appCtx.searchQuery, appCtx.pageNum, appCtx.itemsPerPage, appCtx]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {appCtx.type === "images"
        ? appCtx.data.map((image) => <ImageCard key={image.id} image={image} />)
        : ""}
    </div>
  );
};

export default Images;
