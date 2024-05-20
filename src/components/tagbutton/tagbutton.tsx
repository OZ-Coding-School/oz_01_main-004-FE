import React, { useState } from "react";
import styled from "styled-components";

const TagButton: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setSelected((current) => (current === value ? null : value));
  };

  return (
    <Buttondiv>
      {["하수", "중수", "고수"].map((item) => (
        <TagBtn
          key={item}
          isActive={selected === item}
          onClick={() => handleClick(item)}
        >
          {item}
        </TagBtn>
      ))}
    </Buttondiv>
  );
};

export default TagButton;

const TagBtn = styled.button<{ isActive: boolean }>`
  width: 82px;
  height: 35px;
  background-color: ${(props) => (props.isActive ? "#ffffff" : "#efefef")};
  color: ${(props) => (props.isActive ? "#F97066" : "#101828")};
  border-radius: 20px;
  border: ${(props) => (props.isActive ? "1px solid #F97066" : "none")};
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Buttondiv = styled.div`
  width: 272px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
