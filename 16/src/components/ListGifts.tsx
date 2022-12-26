import { Box, Button, HStack, Icon, Spacer, Text } from "@chakra-ui/react";
import { useStore } from "zustand"
import giftStore from "../context/GiftStore"
import { StarIcon } from "@chakra-ui/icons";
import { ShowPrice } from "./Price";
import { Total } from "./Total";

export const ListGifts = () => {
    const gifts = giftStore(x => x.gifts);

    return (
        <Box>
            {gifts.map(i => {
                return (
                    <HStack key={i.id}>
                        <Icon as={StarIcon}></Icon>

                        <Text>{i.name} x {i.amount}</Text>
                        <Text fontSize="sm">({i.owner}) </Text>
                        <Text>
                            <ShowPrice price={i.price} amount={i.amount}></ShowPrice>
                        </Text>
                        <Spacer></Spacer>
                        <Button size="sm">E</Button>
                        <Button size="sm">X</Button>
                    </HStack>
                );
            })}
            <Total gifts={gifts}></Total>
        </Box>
    )
}