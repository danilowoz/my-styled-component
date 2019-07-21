import React from "react";
import DOM_ELEMENTS from "html-tags";

const isStyledComponent = comp => !!(comp && comp.__styledClassName);

/**
 * Creates a style element and append to `head`
 * @returns {HTMLStyleElement}
 */
const createStyleTag = () => {
  const head = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");

  style.type = "text/css";
  head.appendChild(style);

  return style;
};

/**
 * Creates a random className
 * @returns {string}
 */
const createRandomClassName = () =>
  `std-${Math.random()
    .toString(36)
    .substring(7)}`;

/**
 * Creates a css property list with className
 * @returns {CSSRuleList} .className { cssPropesties }
 */
const css = (className, style) => `.${className} { ${style} }`;

const createStyledElement = (type, styles, styleTagIntance, inheritCall) => {
  const styledClassName = createRandomClassName();

  const styledComponent = ({
    as: elementType = type,
    className: originalClassName = "",
    ...props
  }) => {
    const styleText = [];
    const sheet = styleTagIntance.sheet;
    const className = `${styledClassName} ${originalClassName}`;

    styles.forEach((s, i) => {
      styleText.push(s);

      if (inheritCall[i]) {
        styleText.push(inheritCall[i](props));
      }
    });

    const cssWithClass = css(
      styledClassName,
      styleText.filter(Boolean).join("")
    );

    sheet.insertRule(cssWithClass, sheet.cssRules.length);

    return React.createElement(elementType, {
      ...props,
      className
    });
  };

  styledComponent.__styledClassName = styledClassName;

  return styledComponent;
};

/**
 * Creates styled instance
 * @returns {Object[HTMLElement]}
 */
const styled = () => {
  const styleTagIntance = createStyleTag();

  return DOM_ELEMENTS.reduce((prev, element) => {
    prev[element] = (styles, ...inheritCall) =>
      createStyledElement(element, styles, styleTagIntance, inheritCall);

    return prev;
  }, {});
};

export default styled();
