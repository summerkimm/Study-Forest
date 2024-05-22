const BREAKPOINT_TABLET = 744;
const BREAKPOINT_PC = 1920;
const BREAKPOINT_MOBILE = 375;

export const onTablet = `@media only screen and (min-width: ${BREAKPOINT_TABLET}px) and (max-width: ${
  BREAKPOINT_PC - 1
}px)`;

export const onPc = `@media only screen and (min-width: ${BREAKPOINT_PC}px)`;

export const onMobile = `@media only screen and (min-width: ${BREAKPOINT_MOBILE}px and (max-width: ${
  BREAKPOINT_TABLET - 1
}px)`;
