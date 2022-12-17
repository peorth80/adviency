import { HStack, Icon, StackProps, Text } from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'

export const Gifts = (props: StackProps) => {
    const { children, ...rest } = props;
    return (
        <HStack>
            <Icon as={StarIcon} />
            <Text>{children}</Text>
        </HStack>
    )
}