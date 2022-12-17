import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Box, Center, Heading } from '@chakra-ui/react'
import { Flex, Text } from '@chakra-ui/react'
import { Gifts } from './components/Gifts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>

      <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"} bgImage="url('/xmas.jpg')">
        <Center>
          <Box bg="white" p={6}>
            <Heading>Regalos</Heading>
            <ul>
              <Gifts>Ron</Gifts>
              <Gifts>Whisky</Gifts>
            </ul>
          </Box>
        </Center>
      </Flex>
    </div>

  )
}

export default App
