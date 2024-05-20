import React from "react";
import styled from "styled-components";

interface SelectBoxProps {
  options: { label: string; value: string }[];
}

const SelectBox: React.FC<SelectBoxProps> = ({ options }) => {
  return (
    <Select>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SelectBox;

const Select = styled.select`
  width: 100%;
  height: 37px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #ffffff;
`;
