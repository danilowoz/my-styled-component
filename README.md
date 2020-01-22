# my-styled-component

💅 My own implementation of styled-components within 100 lines of code.

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
      text-decoration: underline;
      text-transform: ${({ color }) => {
        return color === "red" ? "uppercase" : "none";
      }};
    `}

  strong,
    span {
    color: #000;
    font-weight: normal;
  }

  ${Strong} {
    font-size: 20px;
  }
`;

<Secton as="p">
   <Text color="red">Foo <strong>Foo strong</strong></Text>
</Secton>
```

## Dependencies

- `html-tags`: List of standard HTML tags;
- `stylis`: light–weight css preprocessor;
