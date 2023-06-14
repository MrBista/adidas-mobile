import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SpecifiedView from '../components/SpecifiedView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { home, jumboTron } from '../data';

function HomeScreen({ navigation }) {
  const toProducts = () => {
    navigation.navigate('Products');
  };

  return (
    <SpecifiedView>
      <ScrollView className='bg-white' showsVerticalScrollIndicator={false}>
        <View className='mt-10 mb-4'>
          <Text className='font-bold uppercase text-lg text-center'>
            featured
          </Text>
          <View className='w-20 h-[5px] bg-black m-auto mb-5'></View>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className='px-4'
          >
            {home?.map(({ imgUrl, name }, i) => {
              return (
                <View className=' mb-4 w-[200px]  overflow-hidden mr-4' key={i}>
                  <Image
                    source={{
                      uri: imgUrl,
                    }}
                    className='h-[200px] w-full overflow-hidden'
                  />
                  <Text className='font-bold text-[20px] py-1 uppercase w-full '>
                    {name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {jumboTron.map(({ imgUrl }, i) => {
          return (
            <View key={i}>
              <View className='relative mt-1'>
                <Image
                  source={{
                    uri: imgUrl,
                  }}
                  style={{
                    resizeMode: 'stretch',
                  }}
                  className='h-[550px] w-full'
                />

                <View className='absolute  bottom-36 left-9 w-[350px]'>
                  <Text className='text-white text-[29px]'>
                    adidas Sportswear
                  </Text>
                  <Text className='text-white text-[20px]'>
                    The You-niform. Sportswear born on the pitch
                  </Text>
                </View>
                <View className='absolute bottom-16 left-9 '>
                  <TouchableOpacity onPress={toProducts} className='z-30'>
                    <Text className='text-black text-[30px] uppercase bg-white px-4 py-2 z-40'>
                      shop now
                      <Ionicons name='arrow-forward-outline' size={30} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className='absolute border-2 border-black w-full h-full left-2 px-4 py-6 -top-11 '></Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SpecifiedView>
  );
}

export default HomeScreen;
