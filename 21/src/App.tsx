import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { AddGift } from './components/AddGift'
import { ListGifts } from './components/ListGifts'
import './App.css';

function App() {

  return (
    <div className="App">
      <Flex h="100vh" w="100vw" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" w={700} p={2}>
            <Heading>Regalos 21</Heading>
            <AddGift></AddGift>
            <ListGifts></ListGifts>
          </Box>
        </Center>
      </Flex>
    </div>
  )
}

export default App
