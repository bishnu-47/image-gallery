import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  // data related state
  const [data, setData] = useState([]);
  const [type, setType] = useState("images");
  const [searchQuery, setSearchQuery] = useState("");

  // pagination related state
  const [pageNum, setPageNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // app state
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(false);

  const appState = {
    data: data,
    setData: setData,

    type: type,
    setType: setType,

    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,

    pageNum: pageNum,
    setPageNum: setPageNum,

    itemsPerPage: itemsPerPage,
    setItemsPerPage: setItemsPerPage,

    isLoading: isLoading,
    setIsLoading: setIsLoading,

    err: err,
    setErr: setErr,
  };
  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
