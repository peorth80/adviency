import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { AddGift } from './components/AddGift';
import { DisplayGift } from './components/DisplayGift';
import { iGifts, iGift } from './interfaces/iGift'

function App() {
  const GIFT_STORE = "gifts";
  const [items, setItems] = useState<iGift[]>([]);

  const onDelete = (giftToDel: iGift) => {
    setItems(items.filter((i) => i.name != giftToDel.name));
  }

  const addGift = (gift2add: iGift) => {
    const exists = items.filter((i) => i.name == gift2add.name);

    if (exists.length == 0 && gift2add.name != "" && gift2add.amount > 0)
      setItems([...items, gift2add]);
  }

  useEffect(() => {
    const loadedItems = localStorage.getItem(GIFT_STORE);

    if (loadedItems) {
      setItems(JSON.parse(loadedItems));
    }
  }, [])

  useEffect(() => {
    if (items && items.length > 0)
      localStorage.setItem(GIFT_STORE, JSON.stringify(items));
    else
      localStorage.removeItem(GIFT_STORE);
  }, [items]);

  const deleteAll = () => setItems([]);

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" w={300} p={5}>
            <Heading>Regalos 12</Heading>
            <AddGift onAdd={addGift}></AddGift>
            <DisplayGift gifts={items} onDelete={onDelete}></DisplayGift>
            <Button colorScheme="red" w="100%" onClick={deleteAll}>Borrar todo</Button>
          </Box>


        </Center>

      </Flex>
    </div>
  )
}

export default App
