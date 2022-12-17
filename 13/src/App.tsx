import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { AddGift } from './components/addGift'
import { ShowGifts } from './components/showGifts'
import { iGifts, iGift } from './interfaces/iGifts'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const GIFTS_STORAGE = "gifts";
  const [items, setItems] = useState<iGift[]>([]);
  const [giftToEdit, setGiftToEdit] = useState<iGift>();

  const handleAdd = (gift2add: iGift) => {
    const existing = items.filter((i) => i.name == gift2add.name && i.owner == gift2add.owner);

    if (existing.length == 0 && gift2add.name != "" && gift2add.owner != "") {
      gift2add.id = uuidv4();

      setItems([...items, gift2add]);
    }
  }

  useEffect(() => {
    const savedGifts = localStorage.getItem(GIFTS_STORAGE);

    if (savedGifts)
      setItems(JSON.parse(savedGifts));

  }, [])

  useEffect(() => {
    if (items.length > 0)
      localStorage.setItem(GIFTS_STORAGE, JSON.stringify(items));
    else
      localStorage.removeItem(GIFTS_STORAGE);
  }, [items])


  const handleDelete = (gift: iGift) => {
    setItems(items.filter((i) => i.name != gift.name));
  }

  const handleShow = (gift: iGift) => {
    setGiftToEdit(gift);
  }

  const handleEdit = (gift: iGift) => {
    const updatedItems = items.map(item => {
      if (item.id == gift.id)
        return gift;
      else
        return item;
    });

    setItems(updatedItems);

    setGiftToEdit(undefined);
  }

  return (
    <div className="App">
      <Flex w="100vw" h="100vh" justifyContent="center" align="center" bg="url('/xmas.jpg')">
        <Center>
          <Box bgColor="white" w={500} p={6}>
            <Heading p={5}>Regalos 13</Heading>
            <AddGift onAdd={handleAdd} onEdit={handleEdit} onShow={handleShow} onCloseDrawer={() => setGiftToEdit(undefined)} giftToEdit={giftToEdit}></AddGift>
            <ShowGifts gifts={items} onDelete={handleDelete} onEdit={handleEdit} onShow={handleShow} />

            {items.length > 0 &&
              <Button colorScheme="red" w="100%" onClick={() => setItems([])}>Borrar todo</Button>
            }
          </Box>
        </Center>

      </Flex>
    </div>
  )
}

export default App
