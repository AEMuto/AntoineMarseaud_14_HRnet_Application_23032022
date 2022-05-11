import React, {useEffect, useState} from 'react';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type Option = {
  value: number;
  label: string;
};

interface DropdownProps extends DropdownStyles {
  options: Option[];
  selectedOption: number;
  setSelectedOption: Dispatch<SetStateAction<any>>;
}

interface DropdownStyles {
  width?: `${number}px`;
  height?: `${number}px`;
  margin?:
    | `${number}px`
    | `${number}px ${number}px`
    | `${number}px ${number}px ${number}px ${number}px`;
  padding?:
    | `${number}px`
    | `${number}px ${number}px`
    | `${number}px ${number}px ${number}px ${number}px`;
  borderRadius?:
    | `${number}px`
    | `${number}px ${number}px`
    | `${number}px ${number}px ${number}px ${number}px`;
  maxHeight?: `${number}px`;
  fontSize?: `${number}rem`;
  fontWeight?: number;
}

const SelectMenu = (props: DropdownProps) => {
  const {
    options,
    selectedOption,
    setSelectedOption,
    width,
    height,
    margin,
    padding,
    borderRadius,
    maxHeight,
    fontSize,
    fontWeight
  } = props;
  const [selectedIndex, setSelectedIndex] = useState(selectedOption);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  useEffect(() => {
    setSelectedIndex(selectedOption)
  },[selectedOption])

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const setSelectedThenCloseDropdown = (index: number) => {
    console.log(index);
    setSelectedIndex(index);
    setSelectedOption(options[index].value);
    setIsOptionsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'SpaceBar':
      case 'Enter':
        e.preventDefault();
        setSelectedThenCloseDropdown(selectedIndex);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setIsOptionsOpen(false);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(
          selectedIndex - 1 >= 0 ? selectedIndex - 1 : options.length - 1,
        );
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(
          selectedIndex == options.length - 1 ? 0 : selectedIndex + 1,
        );
        break;
      default:
        break;
    }
  };

  return (
    <StyledDropdown
      width={width ? width : '180px'}
      height={height ? height : '42px'}
      margin={margin ? margin : '0px'}
      padding={padding ? padding : '13.5px 12px'}
      borderRadius={borderRadius ? borderRadius : '5px'}
      maxHeight={maxHeight ? maxHeight : '215px'}
      fontSize={fontSize?fontSize:'0.85rem'}
      fontWeight={fontWeight?fontWeight: 400}
    >
      <div className={isOptionsOpen ? 'container expanded' : 'container'}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? 'expanded' : ''}
          onClick={toggleOptions}
          onKeyDown={handleListKeyDown}>
          {options[selectedIndex].label}
        </button>
        <ul
          className={`options ${isOptionsOpen ? 'show' : ''}`}
          role="listbox"
          aria-activedescendant={options[selectedIndex].label}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}>
          {options.map((option, index) => (
            <li
              key={`${option.label}-${index}`}
              id={option.label}
              role="option"
              aria-selected={selectedIndex == index}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setSelectedThenCloseDropdown(index);
              }}>
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </StyledDropdown>
  );
};

export default SelectMenu;

const StyledDropdown = styled.div<DropdownStyles>`
  margin: ${(props) => props.margin};
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  div.container {
    display: flex;
    flex-direction: column;
    border: 1px solid #bbb;
    background-color: #fff;
    border-radius: ${(props) => props.borderRadius};
    position: absolute;
    z-index: 1;
    overflow: hidden;
    &.expanded {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
    }
  }

  button {
    border: none;
    background-color: transparent;
    width: ${(props) => props.width};
    padding: ${(props) => props.padding};
    text-align: left;
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    position: relative;
  }

  button:hover {
    cursor: pointer;
  }

  button::after {
    content: '';
    position: absolute;
    width: 9px;
    height: 9px;
    top: 50%;
    transform: translateY(-50%);
    right: 9px;
    background-color: #aaa;
    clip-path: polygon(50% 75%, 0 0, 100% 0);
  }

  button.expanded::after {
    clip-path: polygon(50% 25%, 0% 100%, 100% 100%);
  }

  ul.options {
    display: none;
    flex-direction: column;
    list-style: none;
    max-height: ${(props) => props.maxHeight};
    overflow-y: auto;
  }

  ul.show {
    display: flex;
  }

  ul.options li {
    padding: ${(props) => props.padding};
    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    text-align: left;
  }

  ul.options li:active,
  ul.options li:focus,
  ul.options li:hover,
  ul.options li[aria-selected='true'] {
    background: #eee;
    cursor: pointer;
  }
`;
