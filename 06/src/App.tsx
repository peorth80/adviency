import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Spacer, Text } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts';

function App() {

  interface Gift {
    name: string;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState('');

  const handleAddGifts = () => {
    setItems([...items, { name: newGift }]);
  }

  const handleNewGift = (e: any) => {
    setNewGift(e.target.value);
  }

  const handleDeleteItem = (item: Gift) => {
    setItems(items.filter((i) => i.name != item.name));
  }

  const handleDeleteAll = () => {
    setItems([]);
  }

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" p={5}>
            <Heading>Regalos 06</Heading>

            <FormControl>
              <HStack>
                <Input type="text" w={150} onChange={handleNewGift}></Input>
                <Button colorScheme="green" m={2} onClick={handleAddGifts}>Agregar</Button>
              </HStack>

              {items.map((item) => {
                return (
                  <HStack m={3}>
                    <Gifts>{item.name}</Gifts>
                    <Spacer />
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteItem(item)}>X</Button>
                  </HStack>
                )
              })}


              {items.length == 0 ?
                <Text m={3}>No hay regalos agregados!</Text> :
                <Button colorScheme="red" m={2} w="100%" onClick={handleDeleteAll}>Borrar todo</Button>
              }


            </FormControl>

          </Box>
        </Center>

      </Flex>
    </div >
  )
}

export default App
