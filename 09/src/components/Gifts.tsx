import { Button, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

interface GiftItem {
    children: string,
    ammount: number,
    onDelete: Function
}

export const Gifts = (props: GiftItem) => {
    const { children, ammount, onDelete, ...rest } = props;

    return (
        <HStack p={1}>
            <Icon as={StarIcon}></Icon>
            <Text>{children} ({ammount})</Text>
            <Spacer />
            <Button colorScheme="red" size="sm" onClick={() => onDelete(children)}>X</Button>
        </HStack >
    );
}