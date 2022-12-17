import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

function App() {

  interface Gift {
    name: string,
    ammount: number
  }

  const [items, setItems] = useState<Gift[]>([]);
  const [itemName, setItemName] = useState('');
  const [itemAmmount, setItemAmmount] = useState(1);

  const handleAdd = () => {
    const exists = items.filter((i) => i.name == itemName);

    if (itemName != "" && exists.length == 0) {
      setItems([...items, { name: itemName, ammount: itemAmmount }]);
    }
  }

  useEffect(
    () => {
      if (items.length > 0) {
        const giftsToStore = JSON.stringify(items);
        localStorage.setItem('gifts', giftsToStore);
      }
    }, [items]
  );

  useEffect(
    () => {
      const loadedItems = localStorage.getItem("gifts");
      if (loadedItems) {
        const giftStored = JSON.parse(loadedItems);
        setItems(giftStored);
      }
    }
    , []);

  const handleDelete = (giftToDelete: Gift) => {
    setItems(items.filter((i) => i.name != giftToDelete.name));
  }

  const updateAmmount = (n: any) => setItemAmmount(n);

  const handleDeleteAll = () => {
    setItems([]);
    localStorage.removeItem('gifts');
  };

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" p="10">
            <Heading>Regalos 09</Heading>

            <FormControl>
              <HStack>
                <Input type="text" onChange={(e: any) => setItemName(e.target.value)}></Input>
                <NumberInput defaultValue={1} onChange={updateAmmount} min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="green" pl="8" pr="8" onClick={handleAdd}>Agregar</Button>

              </HStack>

              {items.length == 0
                ?
                <Text>No hay regalos :(</Text>
                :
                <Box>
                  <ul>
                    {items.map((i) => {
                      return <Gifts key={i.name} ammount={i.ammount} onDelete={() => handleDelete(i)}>{i.name}</Gifts>
                    })}
                  </ul>
                  <Button colorScheme="red" w="100%" onClick={handleDeleteAll}>Borrar todos los regalos</Button>
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
