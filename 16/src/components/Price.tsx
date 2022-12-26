import { iGift } from "../interfaces/iGift";
import { Flex, HStack, Text } from "@chakra-ui/react";

interface iPriceProps {
    price: number,
    amount: number
}

export const ShowPrice = (gift: iPriceProps) => {
    const total = gift.price * gift.amount;
    return (
        <HStack>
            <Text fontSize="lg">${total}</Text>
            <Text fontSize="sm">(c/u ${gift.price})</Text>
        </HStack>
    );
}