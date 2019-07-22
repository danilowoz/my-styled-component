import React from "react";
import DOM_ELEMENTS from "html-tags";
import stylis from "stylis";

const createStyleTag = () => {
  const head = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");

  style.type = "text/css";
  head.appendChild(style);

  return style;
};

const createRandomClassName = () =>
  `std-${Math.random()
    .toString(36)
    .substring(7)}`;

export const css = (stylesText, options = [], props) => {
  const parseAndCleanRules = mightBeCss =>
    mightBeCss.split("\n").reduce((prev, curr) => {
      const stringTrimed = curr.trim();

      if (!!stringTrimed) prev.push(stringTrimed);

      return prev;
    }, []);

  return stylesText.reduce((prev, curr, index) => {
    const cssRulesParsed = prev.concat(parseAndCleanRules(curr));
    const styledComponent = options[index] && options[index].__styledClassName;

    if (!!styledComponent) {
      return cssRulesParsed.concat(`.${styledComponent}`);
    } else if (typeof options[index] === "function") {
      return cssRulesParsed.concat(options[index](props));
    } else {
      return cssRulesParsed;
    }
  }, []);
};

const insertStyle = (sheet, stylesText, options, props, styledClassName) => {
  const styleText = css(stylesText, options, props);
  const parsedCss = stylis(`.${styledClassName}`, styleText.join(""));
  const setRules = parsedCss
    .split("}")
    .filter(Boolean)
    .map(e => `${e}}`);

  setRules.forEach(rule => {
    sheet.insertRule(rule, sheet.cssRules.length);
  });
};

const createStyledElement = (
  elementType,
  stylesText,
  styleTagIntance,
  options
) => {
  const styledClassName = createRandomClassName();

  const styledComponent = ({
    as = elementType,
    className: classNameFromProps = "",
    ...props
  }) => {
    const { sheet } = styleTagIntance;
    const className = `${styledClassName} ${classNameFromProps}`;

    insertStyle(sheet, stylesText, options, props, styledClassName);

    return React.createElement(elementType, {
      ...props,
      className
    });
  };

  styledComponent.__styledClassName = styledClassName;

  return styledComponent;
};

const styled = () => {
  const styleTagIntance = createStyleTag();

  return DOM_ELEMENTS.reduce((prev, elementType) => {
    prev[elementType] = (stylesText, ...options) =>
      createStyledElement(elementType, stylesText, styleTagIntance, options);

    return prev;
  }, {});
};

export default styled();
