import { View, Image } from 'react-native'
import {Texts} from '../../atoms/Texts';
import {FlatList} from 'react-native-gesture-handler';
import { portafolioStyles } from './portafolioStyle';
import { Alert } from 'react-native';

export const PortafolioWcapital = () => {

    const data = [
        {
            id: 1,
            img: require('../../../assets/images/yunno.png')
        },
        {
            id: 2,
            img: require('../../../assets/images/hundsport.png')
        },
        {
            id: 3,
            img: require('../../../assets/images/yunno.png')
        },
        {
            id: 4,
            img: require('../../../assets/images/hundsport.png')
        },
    ]

    const Item = ({img}) => {
       
        return (
            <View style={portafolioStyles.item}>
                <Image style={portafolioStyles.image} source={img}/>
            </View>
        )

    }

    const renderItem = ({item}) => {
        return (
            
            <Item
                title={item.name}
                img={item.img}
            />

        )
    }

    return (

        <View style={portafolioStyles.container} onPres={()=>console.log('clic')}>

            <View>
                <Texts type='h3' extraStyles={[portafolioStyles.black, portafolioStyles.title]}>Portafolio WCapital</Texts>
            </View>

            <FlatList 
                style={portafolioStyles.flatlist}
                horizontal={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
            />

        </View>

    )
}