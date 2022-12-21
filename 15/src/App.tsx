import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { AddGift } from './components/AddGift'
import { ListGifts } from './components/ListGifts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" w={300}>
            <Heading>Regalos 15</Heading>

            <AddGift></AddGift>
            <ListGifts></ListGifts>
          </Box>
        </Center>


      </Flex>

    </div>
  )
}

export default App
