import { useSearchParams } from "react-router-dom";
import TagButton from "../../../components/tagbutton/tagbutton";

const QueryTagButton = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = ["하수", "중수", "고수"];

  const handleSelect = (selectedTag: string | null) => {
    const newParams = Object.fromEntries(searchParams); // 배열로 받아서 객체로 변환
    if (selectedTag) {
      newParams.level = selectedTag;
    } else {
      delete newParams.level;
    }
    setSearchParams(newParams);
  };

  return <TagButton tags={tags} onSelect={handleSelect} />;
};

export default QueryTagButton;
