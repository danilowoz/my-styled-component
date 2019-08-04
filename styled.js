import React from "react";
import DOM_ELEMENTS from "html-tags";
import stylis from "stylis";

const createStyleTag = () => {
  const style = document.createElement("style");
  style.type = "text/css";

  document.querySelector("head").appendChild(style);

  return style;
};

const createRandomClassName = () =>
  `std-${Math.random()
    .toString(36)
    .substring(7)}`;

export const css = (stylesText, ...args) => props => {
  const splitStringInCSSRules = cssRule =>
    cssRule.split("\n").reduce((prev, curr) => {
      const stringTrimed = curr.trim();

      if (!!stringTrimed) prev.push(stringTrimed);

      return prev;
    }, []);

  return stylesText
    .reduce((prev, curr, index) => {
      const cssRules = prev.concat(splitStringInCSSRules(curr));
      const styledClassname = args[index] && args[index].__styledClassName;

      if (!!styledClassname) {
        return cssRules.concat(`.${styledClassname}`);
      } else if (typeof args[index] === "function") {
        const funcResult = args[index](props);
        const isACssRule =
          typeof funcResult === "function" ? funcResult(props) : funcResult;
        return cssRules.concat(isACssRule);
      } else if (args[index] !== undefined) {
        return cssRules.concat(args[index]);
      } else {
        return cssRules;
      }
    }, [])
    .filter(Boolean)
    .join("");
};

const insertStyle = (sheet, stylesText, args, props, styledClassName) => {
  const styleText = css(stylesText, ...args)(props);
  const parsedCss = stylis(`.${styledClassName}`, styleText);
  const setRules = parsedCss
    .split("}")
    .filter(Boolean)
    .map(e => `${e}}`);

  setRules.forEach(rule => sheet.insertRule(rule, sheet.cssRules.length));
};

const createStyledElement = (
  elementType,
  stylesText,
  styleTagIntance,
  args
) => {
  const styledClassName = createRandomClassName();

  const styledComponent = ({
    as = elementType,
    className: classNameFromProps = "",
    ...props
  }) => {
    const { sheet } = styleTagIntance;
    const className = `${styledClassName} ${classNameFromProps}`;

    insertStyle(sheet, stylesText, args, props, styledClassName);

    return React.createElement(elementType, {
      ...props,
      className
    });
  };

  styledComponent.__styledClassName = styledClassName;

  return styledComponent;
};

const styled = {};
const styleTagIntance = createStyleTag();

DOM_ELEMENTS.forEach(html => {
  styled[html] = (stylesText, ...args) =>
    createStyledElement(html, stylesText, styleTagIntance, args);
});

export default styled;
