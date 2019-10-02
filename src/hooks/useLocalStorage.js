import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
    if (typeof key !== "string") {
        throw new Error("Type Error:\nuseLocalStorage requires a key argument of type string.");
    }
    const [storedValue, setStoredValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = value => {
        setStoredValue(value);
        localStorage.setItem(key, JSON.stringify(value));
    }

    return [storedValue, setValue];
}

export default useLocalStorage;