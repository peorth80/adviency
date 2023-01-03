import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box, Button, Center, Flex, Heading, HStack, Spacer } from '@chakra-ui/react'
import { AddGift } from './components/AddGift'
import { ListGifts } from './components/ListGifts'
import useSound from 'use-sound'
import xmasMusic from '/music.mp3'
import { StarIcon, SunIcon } from '@chakra-ui/icons';

function App() {

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" p={4}>
            <HStack m={3}>
              <Heading>Regalos 22</Heading>
              <Spacer></Spacer>
              <PlayMusic></PlayMusic>
            </HStack>
            <AddGift></AddGift>
            <ListGifts></ListGifts>
          </Box>
        </Center>

      </Flex>
    </div>
  )
}

function PlayMusic() {
  const [playSound, { stop }] = useSound(xmasMusic)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (play)
      playSound();
    else
      stop();
  }, [play])

  const setIcon = () => {
    if (play)
      return StarIcon;
    else
      return SunIcon;
  }

  return (
    <Button onClick={() => setPlay(!play)} as={setIcon()}>
      Play Sound
    </Button>
  )
}

export default App
