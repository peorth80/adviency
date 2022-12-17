import { HStack, Icon, StackProps, Text } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

export const Gifts = (props: StackProps) => {
    const { children, ...rest } = props;

    return (
        <HStack {...rest}>
            <Icon as={StarIcon}></Icon>
            <Text>{children}</Text>
        </HStack>
    )
}