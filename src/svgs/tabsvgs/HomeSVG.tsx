import * as React from "react"
import Svg, { SvgProps, G, Mask, Path } from "react-native-svg"
const HomeSVG = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G opacity={0.5}>
      <Mask
        id="a"
        width={24}
        height={24}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
      </Mask>
      <G mask="url(#a)">
        <Path
          fill="#1C1B1F"
          d="M6.008 19h3v-6h6v6h3v-9l-6-4.5-6 4.5v9Zm-2 2V9l8-6 8 6v12h-7v-6h-2v6h-7Z"
        />
      </G>
    </G>
  </Svg>
)
export default HomeSVG
