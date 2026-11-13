import { useEffect } from "react";
import { useState } from "react";

export default function usePagination({
  totalItems,
  itemsPerPage,
  initialPage = 0,
  accordianWingSize = 2,
}) {
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
  }, [itemsPerPage, initialPage, totalItems]);

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

  function getAccordionArray() {
    if (totalPages === 0) return [];

    const accordionArray = [];
    const start = Math.max(currentPage - accordianWingSize, 0);
    const end = Math.min(currentPage + accordianWingSize, totalPages - 1);

    if (start > 0) {
      accordionArray.push(0);
      if (start > 1) accordionArray.push(start === 2 ? 1 : null);
    }

    for (let page = start; page <= end; page += 1) {
      accordionArray.push(page);
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        accordionArray.push(end === totalPages - 3 ? totalPages - 2 : null);
      }
      accordionArray.push(totalPages - 1);
    }
    return accordionArray;
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
    getAccordionArray,
  };
}
