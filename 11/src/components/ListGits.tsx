import { HStack, Icon, Text, Image, Box } from "@chakra-ui/react"
import { iGift, iGifts } from "../interfaces/iGift";
import { StarIcon } from "@chakra-ui/icons"
import { Gift } from './Gift'

export const ListGifts = (props: iGifts) => {
    //const { gifts, ...rest } = props;
    const { array, onDelete } = props;

    return (
        <Box p={5}>
            {array.length == 0 ?
                <Text>No hay regalos :(</Text>
                :
                <ul>
                    {array.map(
                        (i: iGift) => {
                            return <Gift amount={i.amount} name={i.name} image={i.image} key={i.name} onDelete={onDelete(i)}></Gift>
                        })}
                </ul>
            }
        </Box>
    );
}
