import React, { useState } from "react";

import styled from "./styled";

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

    text-align: center;

    .strong {
      color: blue;
    }
  `;
  /* > ${Strong} {
        color: green;
  
        ${Strong} {
          color: green;
        }
      } */

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
      </Text>
    </div>
  );
}

export default App;
