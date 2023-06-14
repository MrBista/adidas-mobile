import React from 'react';
import { Image, View } from 'react-native';

const Imgaes = () => {
  return (
    <View className='w-[100px] shadow shadow-black bg-white mr-4'>
      <Image
        source={{
          uri: 'https://www.adidas.co.id/media/catalog/product/g/w/gw3899_sl_ecom.jpg',
        }}
        className='h-[100px] w-full '
        style={{
          resizeMode: 'cover',
        }}
      />
    </View>
  );
};

export default Imgaes;
