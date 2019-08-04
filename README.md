# my-styled-component

💅My own implementation of styled-components within 100 lines of code.

## Usage

```jsx
const SECTION_WIDTH = 400;

const Section = styled.section`
  width: ${SECTION_WIDTH}px;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const Text = styled.p`
  color: ${props => props.color};
  font-size: 16px;
  text-align: center;

  ${({ active }) =>
    active &&
    css`
      font-weight: bold;
    `}

  strong,
  span {
    color: #000;
    font-weight: normal;
  }

  ${Strong} {
    color: 20px;
  }
`;
```

## Dependencies

- `html-tags`: List of standard HTML tags;
- `stylis`: light–weight css preprocessor;
