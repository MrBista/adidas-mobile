import { Image, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ navigation, mainImg, name, price, id }) => {
  const cardOnPress = (id) => {
    navigation.navigate('Detailed Shoe', {
      id,
    });
  };

  return (
    <TouchableOpacity
      className=' w-[46%] h-[300px] relative mx-1 shadow shadow-black bg-white mt-4 rounded'
      onPress={() => cardOnPress(id)}
    >
      <View className='h-[200px]'>
        <Image
          source={{
            uri: mainImg,
          }}
          className='h-full w-full rounded-sm'
        />
      </View>
      <View className='px-2'>
        <Text className='font-semibold mt-1 '>{name}</Text>
        <View className='mt-[12px] absolute top-[200%] px-2'>
          <Text className='text-gray-500'>{name}</Text>
          <Text className='font-bold'>Rp {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
