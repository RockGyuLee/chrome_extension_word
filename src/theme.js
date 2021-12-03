const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(14),
  base: calcRem(16),
  lg: calcRem(18),
  xl: calcRem(20),
  text : "20px",
  xxl: calcRem(22),
  xxxl: calcRem(30),
  titleSize: calcRem(50),
  subTitleSize: calcRem(40),
};

const deskTopFontSizes = {
  sm : "16px",
  smd : "20px",
  md : "24px",
  lmd : "30px",
  lg : "36px",
  hd : "48px"
}

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray_1: "#222222",
  red : "red",
  gray_2: "#767676",
  green_1: "#3cb46e",
  main : "#333333",
  backG : "#d9d9d9",
  btn : "#EBDBFA",
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const fontFamily = {
  comic : "Comic Sans MS, Comic Sans, cursive;",
  fontFamily : 'Himelody',
}

const theme = {
  fontSizes,
  fontFamily,
  deskTopFontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export default theme;