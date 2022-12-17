import { Box, Button, Center, Flex, FormControl, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import reactLogo from './assets/react.svg'
import { Gifts } from './components/Gifts'

function App() {

  interface Gifts {
    name: string,
    amount: number,
    image: string
  }

  const [items, setItems] = useState<Gifts[]>([]);
  const [newGiftName, setNewGiftName] = useState('');
  const [newGiftAmount, setNewGiftAmount] = useState(1);
  const [newGiftImage, setNewGiftImage] = useState('');

  const addGift = () => {
    const exists = items.filter((item) => item.name == newGiftName);

    if (exists.length == 0 && newGiftAmount > 0)
      setItems([...items,
      {
        name: newGiftName,
        amount: newGiftAmount,
        image: newGiftImage
      }]);
  }

  useEffect(() => {
    const gifts = localStorage.getItem("gifts");
    if (gifts)
      setItems(JSON.parse(gifts));
  }
    , []);

  useEffect(() => {
    if (items.length > 0)
      localStorage.setItem("gifts", JSON.stringify(items));
    else
      localStorage.removeItem("gifts");
  }, [items]);

  const deleteAll = () => setItems([]);

  const handleDelete = (giftToDelete: Gifts) => {
    setItems(items.filter((item) => item.name != giftToDelete.name));
  }

  return (
    <div className="App">
      <Flex justifyContent="center" align="center" w="100wv" h="100vh" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" p={5}>
            <Heading>Regalos 10</Heading>

            <FormControl>
              <HStack>
                <Input type="text" onChange={(e: any) => setNewGiftName(e.target.value)} w={40}></Input>
                <Input type="text" onChange={(e: any) => setNewGiftImage(e.target.value)} w={32}></Input>
                <NumberInput w={20} defaultValue={1} min={1} onChange={(n: any) => setNewGiftAmount(n)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button colorScheme="green" onClick={addGift}>Agregar</Button>
              </HStack>

            </FormControl>
            {items.length == 0
              ?
              <Text m={5}>No hay regalos :(</Text>
              :
              <ul>
                {items.map((i) => <Gifts key={i.name} name={i.name} amount={i.amount} image={i.image} onDelete={() => handleDelete(i)}></Gifts>)}
              </ul>
            }

            <Button colorScheme="red" w="100%" onClick={deleteAll}>Borrar todo</Button>

          </Box>

        </Center>

      </Flex>
    </div>
  )
}

export default App
