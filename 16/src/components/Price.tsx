import { iGift } from "../interfaces/iGift";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";

interface iPriceProps {
    price: number,
    amount: number
}

export const ShowPrice = (gift: iPriceProps) => {
    const total = gift.price * gift.amount;
    return (
        <HStack>
            <Box><Text fontSize="lg">${total}</Text></Box>
            <Box><Text fontSize="sm">(c/u ${gift.price})</Text></Box>
        </HStack>
    );
}