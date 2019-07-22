import React, { useState } from "react";

import styled, { css } from "./styled";

function App() {
  const [color, setColor] = useState("red");

  const Section = styled.section`
    color: red;
  `;

  const Strong = styled.strong`
    font-weight: bold;
  `;

  const Text = styled.p`
    color: ${props => props.color};
    font-size: 16px;

    ${() =>
      css`
        font-weight: bold;
      `}

    text-align: center;

    strong,
    span {
      color: orange;
      font-weight: normal;
    }

    ${Strong} {
      color: black;

      ${Strong} {
        color: black;
      }
    }

    font-size: 32px;
  `;

  const Button = styled.button`
    border: 1px solid red;
  `;

  return (
    <div>
      <Section id="foo">foo</Section>
      <Button onClick={() => setColor("blue")}>click me</Button>
      <Text as="h1" className="my-class" color={color}>
        Texto
        <Strong> strong</Strong>
        <span> span</span>
      </Text>
    </div>
  );
}

export default App;
