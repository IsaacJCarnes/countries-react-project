import { useEffect, useState } from "react";

const useLocalStorage = (storageName = "storedData") => {
  const [storage, setStorage] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const localStorage = window.localStorage.getItem(storageName);
      const localJson = localStorage ? JSON.parse(localStorage) : {};
      localJson && setStorage(localJson);
    } catch (e) {
      console.error(
        `Could not retrieve localStorage${e.message ? `\n${e.message}` : ""}`,
      );
    } finally {
      setIsLoaded(true);
    }
  }, [storageName]);

  function setStorageItem(name, value) {
    setStorage((previousStorage) => {
      const newStorage = {
        ...previousStorage,
        [name]: value,
      };

      window.localStorage.setItem(storageName, JSON.stringify(newStorage));

      return newStorage;
    });
  }

  function setStorageItems(items) {
    if (typeof items !== "object") {
      console.error("setStorageItems must be called with an object");
      return;
    }
    setStorage((previousStorage) => {
      const newStorage = {
        ...previousStorage,
        ...items,
      };

      window.localStorage.setItem(storageName, JSON.stringify(newStorage));

      return newStorage;
    });
  }
  return { storageData: storage, setStorageItem, setStorageItems, isLoaded };
};

export default useLocalStorage;
