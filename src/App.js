import React, { useState } from "react";

import styled, { css } from "./styled";

function App() {
  const [color, setColor] = useState("red");
  const [active, setActive] = useState(false);

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
        text-transform: ${({ color }) =>
          color === "red" ? "uppercase" : "none"};
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

  const Button = styled.button`
    border: 1px solid red;
  `;

  return (
    <div>
      <Section id="foo">foo</Section>
      <Button onClick={() => setColor("blue")}>update color</Button>
      <Button onClick={() => setActive(true)}>set active</Button>
      <Text as="h1" className="my-class" color={color} active={active}>
        Texto
        <Strong> strong</Strong>
        <span> span</span>
      </Text>
    </div>
  );
}

export default App;
