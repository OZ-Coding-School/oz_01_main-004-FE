import { useSearchParams } from "react-router-dom";
import Dropdown from "../../../components/category/dropdown";

interface QueryStringDropdownProps {
  selectFood: string;
  selectoption: { id: number; name: string; img: string }[];
  defaultLabel: string;
}

const QueryStringDropdown = ({
  selectFood,
  selectoption,
  defaultLabel,
}: QueryStringDropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelect = (item: { id: number; name: string; img: string }) => {
    const newParams = new URLSearchParams(searchParams);

    if (item.id === 1) {
      // id가 1인 경우 해당 selectFood 키 삭제
      newParams.delete(selectFood);
    } else {
      // selectFood 키 업데이트
      newParams.set(selectFood, item.id.toString());
    }

    setSearchParams(newParams); // 수정된 거 적용해줌
  };

  // useEffect(() => {
  //   setSearchParams({});
  // }, []); // 새로고침하면 쿼리스트링 초기화

  return (
    <Dropdown
      options={selectoption}
      defaultLabel={defaultLabel}
      onSelect={handleSelect}
      selectedOption={null}
    />
  );
};

export default QueryStringDropdown;
