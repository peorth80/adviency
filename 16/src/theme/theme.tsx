import { extendTheme } from '@chakra-ui/react'
import "@fontsource/youngserif"

const theme = extendTheme({
  fonts: {
    heading: `'YoungSerif', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
})

export default theme