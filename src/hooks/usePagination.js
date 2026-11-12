import { useEffect } from "react";
import { useState } from "react";

export default function usePagination(totalItems, itemsPerPage, initialPage) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(
    Math.min(initialPage, totalPages),
  );
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const itemsOnCurrentPage = endIndex - startIndex;
  const canNextPage = currentPage < totalPages - 1;
  const canPrevPage = currentPage > 0;

  useEffect(() => {
    setCurrentPage(Math.min(initialPage, totalPages));
  }, [itemsPerPage, initialPage]);

  function setPage(page) {
    if (-1 < page && page < totalPages) {
      setCurrentPage(page);
    } else {
      console.error(
        "Attempting to set page to ",
        page,
        " which is outside the bounds.",
      );
    }
  }

  function nextPage() {
    setCurrentPage((prevVal) => prevVal + 1);
  }

  function prevPage() {
    setCurrentPage((prevVal) => prevVal - 1);
  }
  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}
