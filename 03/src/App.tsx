import { SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Box, Center, Heading, Flex, FormControl, FormLabel, Input, Button, HStack } from '@chakra-ui/react'
import { Gifts } from './components/Gifts'

function App() {

  interface Gift {
    name: string;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState('');

  const handleAddGift = (event: any) => setNewGift(event.target.value);

  const addItem = () => {
    setItems([...items, { name: newGift }]);
    setNewGift('');
  }

  return (
    <div className="App">
      <Flex width={"100vw"} height={"100vh"} alignContent={"center"} justifyContent={"center"} bgImage="url('/xmas.jpg')">
        <Center>
          <Box bg="white" p={6}>
            <Heading>Regalos</Heading>
            <HStack>
              <FormControl>
                <Input type="text" w={200} onChange={handleAddGift} value={newGift} />
                <Button colorScheme="green" ml="5" onClick={addItem}>Agregar</Button>
              </FormControl>
            </HStack>
            <ul>
              {items.map((item) => (
                <Gifts key={item.name}>{item.name}</Gifts>
              ))}
            </ul>
          </Box>
        </Center>
      </Flex>
    </div>
  )
}

export default App
