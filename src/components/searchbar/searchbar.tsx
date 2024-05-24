import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import styles from "./searchbar.module.css";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 입력 값이 비어있지 않으면 쿼리 스트링 업데이트
    // trim -> 공백 제거
    if (inputValue.trim()) {
      setSearchParams({ search: inputValue });
      setInputValue("");
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="재료를 입력하세요."
        />
        <button type="submit" className={styles.searchButton}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
