import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Spacer } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts';

function App() {

  interface Gift {
    name: string;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState('');

  const handleNewGift = (event: any) => setNewGift(event.target.value);

  const handleAddGift = () => {
    setItems([...items, { name: newGift }]);
  }

  const handleDelete = (itemToDelete: Gift) => {
    setItems(items.filter((i) => i.name != itemToDelete.name));
  }

  const handleDeleteAll = () => {
    setItems([]);
  }

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" align="center" justifyContent="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bg="white" p={10}>
            <Heading>Regalos</Heading>
            <FormControl>
              <Input type="text" w={200} onChange={handleNewGift}></Input>
              <Button colorScheme="red" ml={3} onClick={handleAddGift}>Agregar</Button>

              <ul>
                {items.map((item) => {
                  return (
                    <HStack key={item.name} p={3}>
                      <Gifts>{item.name}</Gifts>
                      <Spacer></Spacer>
                      <Button colorScheme="red" size="sm" onClick={() => handleDelete(item)}>X</Button>
                    </HStack>
                  )
                })}
              </ul>
              <Box>
                <Button w="100%" colorScheme="green" onClick={handleDeleteAll} m={3}>Borrar todo</Button>
              </Box>
            </FormControl>
          </Box>
        </Center>

      </Flex>
    </div>
  )
}

export default App
