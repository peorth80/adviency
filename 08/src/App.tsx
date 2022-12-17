import { Box, Center, Flex, FormControl, Heading, HStack, Input, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Text } from '@chakra-ui/react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts';

function App() {

  interface Gift {
    name: string;
    ammount: number;
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [newGift, setNewGift] = useState('');
  const [numGift, setNumGift] = useState(1);

  const handleNumberChange = (n: any) => {
    setNumGift(n);
  }

  const addGift = () => {
    const existingItem = items.filter((i) => i.name == newGift);

    if (existingItem.length == 0 && newGift != "")
      setItems([...items, { name: newGift, ammount: numGift }]);
  }

  const deleteGift = (giftToDelete: Gift) => {
    setItems(items.filter((i) => i.name != giftToDelete.name));
  }


  return (
    <div className="App">
      <Flex justifyContent="center" alignContent="center" w="100vw" h="100vh" bg="url('/xmas.jpg')">
        <Center>
          <Box bg="white" p={5}>
            <Heading>Regalos 08</Heading>

            <FormControl>
              <HStack>
                <Input type="text" w={100} onChange={(e: any) => setNewGift(e.target.value)}></Input>
                <NumberInput w={20} min={1} max={10} onChange={handleNumberChange} defaultValue={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="green" onClick={addGift}>Agregar</Button>
              </HStack>

              {items.length == 0
                ?
                <Text m={8}>No hay regalos :(</Text>
                :
                <ul>
                  {items.map((item) => {
                    return <Gifts key={item.name} name={item.name} ammount={item.ammount} onDelete={deleteGift}>{item.name}</Gifts>
                  })}
                </ul>
              }

              <Button onClick={() => setItems([])} colorScheme="red" w="100%">Borrar todo</Button>

            </FormControl>
          </Box>
        </Center>

      </Flex>



    </div>
  )
}

export default App
