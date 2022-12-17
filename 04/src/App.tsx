import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Spacer } from '@chakra-ui/react'
import { Gifts } from './components/Gifts';

function App() {

  interface Gift {
    name: string;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState('');

  const handleNewGift = (e: any) => setNewGift(e.target.value);

  const addItem = () => {
    setItems([...items, { name: newGift }]);
  }

  const deleteItem = (giftToDelete: Gift) => {
    setItems(items.filter((gift) => gift.name != giftToDelete.name));
  }

  return (
    <div className="App">
      <Flex width="100vw" height="100vh" alignContent="center" justifyContent="center"
        bg={"url('/xmas.jpg')"} bgPosition="center" bgSize="auto">
        <Center>
          <Box p={6} bgColor="white">
            <Heading>Regalos</Heading>
            <HStack>
              <FormControl>
                <Input type="text" w={200} onChange={handleNewGift}></Input>
                <Button colorScheme="green" ml={5} onClick={addItem}>Agregar</Button>
              </FormControl>
            </HStack>
            <ul>
              {items.map((item) => (
                <HStack key={item.name} m={2}>
                  <Gifts >{item.name}</Gifts>
                  <Spacer></Spacer>
                  <Button colorScheme="red" size="sm" onClick={() => deleteItem(item)}>X</Button>
                </HStack>
              ))}
            </ul>
          </Box>
        </Center>
      </Flex>
    </div>
  )
}

export default App
