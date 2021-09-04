import React, { useContext } from "react";
import { Alert } from "antd";

import SearchForm from "./components/search-form.js";
import Loading from "./components/loading.js";
import Images from "./components/images.js";
import PaginationSection from "./components/pagination.js";
import { AppContext } from "./store/app-context-provider";

function App() {
  const appCtx = useContext(AppContext);

  function search(term) {
    const t = term.trim();
    appCtx.setSearchQuery(t);
  }

  return (
    <div className="container mx-auto px-6 pb-6 h-screen relative">
      <SearchForm search={search} />

      {/*No Images Found*/}
      {appCtx.isLoading === false &&
        appCtx.data.length === 0 &&
        !appCtx.err && (
          <p className="text-3xl font-semibold text-gray-800">
            No Images Found!
          </p>
        )}

      {/*Loading*/}
      {appCtx.isLoading ? (
        <Loading size="large" />
      ) : (
        !appCtx.err && (
          <>
            <Images />

            <PaginationSection
              pageNum={appCtx.pageNum}
              itemsPerPage={appCtx.itemsPerPage}
              setPageNum={appCtx.setPageNum}
              setItemsPerPage={appCtx.setItemsPerPage}
            />
          </>
        )
      )}

      {/*error*/}
      <div className="absolute bottom-4 w-2/3">
        {appCtx.err && (
          <Alert type="error" message="Something went wrong!" banner />
        )}
      </div>
    </div>
  );
}

export default App;
