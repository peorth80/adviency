import { iGift, iGifts } from "../interfaces/iGift"
import { Flex, Text } from '@chakra-ui/react';

interface iTotalProps {
    gifts: iGift[]
}

export const Total = ({ gifts }: iTotalProps) => {
    let total = 0;

    gifts.map(i => {
        total += (i.amount * i.price);
    })

    return (
        <Flex justifyContent="right" marginTop={4} borderTop={"1px solid black"}>
            <Text>Total: ${total}</Text>
        </Flex>);
}