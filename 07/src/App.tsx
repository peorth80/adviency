import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts';

function App() {

  interface Gift {
    name: string;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState("");

  const handleDeleteItem = (itemToDelete: Gift) => {
    setItems(items.filter((e) => e.name != itemToDelete.name));
  }

  const handleDeleteAll = () => setItems([]);

  const addItem = () => {
    const existing = items.filter((e) => e.name == newGift);

    if (existing.length == 0 && newGift != "")
      setItems([...items, { name: newGift }]);
  }

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" p={5}>
            <Heading>Regalos 07</Heading>

            <FormControl>
              <HStack p={5}>
                <Input type="text" w={200} onChange={(e: any) => setNewGift(e.target.value)} />
                <Button colorScheme="green" onClick={addItem}>Agregar regalo</Button>
              </HStack>

              {
                items.length == 0 ?
                  <Text>No hay regalos :(</Text>
                  :
                  <Box>
                    <ul>
                      {items.map((item) => {
                        return <Gifts key={item.name} onDelete={handleDeleteItem}>{item.name}</Gifts>
                      })}
                    </ul>
                    <Button colorScheme="red" w="100%" m={1} onClick={handleDeleteAll}>Borrar todo</Button>
                  </Box>
              }


            </FormControl>
          </Box>
        </Center>
      </Flex>
    </div>
  )
}

export default App
