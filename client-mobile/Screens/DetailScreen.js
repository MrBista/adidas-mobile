import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SpecifiedView from '../components/SpecifiedView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_DETAIL } from '../queries/porduct';
import Loader from '../components/Loader';
import ErrorPage from '../components/ErrorPage';

const DetailScreen = ({ navigation, route }) => {
  const [sizes, setSizes] = useState([
    '6',
    '6.5',
    '7',
    '7.5',
    '9',
    '9.5',
    '10',
    '11',
  ]);
  const [displayImage, setDisplayImage] = useState('');
  const { id } = route.params;
  const { data, loading, error } = useQuery(GET_PRODUCTS_DETAIL, {
    variables: { getProductByIdId: id },
  });
  useEffect(() => {
    if (data) {
      if (Object.values(data).length > 0) {
        setDisplayImage(data.getProductById.mainImg);
      }
    }
  }, [data]);
  const [selectedSize, setSelectedSize] = useState('6');
  const toProductScreen = () => {
    navigation.navigate('List Shoe');
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage />;
  }
  const { getProductById: detail } = data;
  return (
    <SpecifiedView className='bg-white'>
      <TouchableOpacity
        onPressOut={toProductScreen}
        className='absolute pt-16 px-3 z-30'
      >
        <Ionicons name={'arrow-back-outline'} size={45} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{
              uri:
                displayImage ||
                'https://www.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1732584341.jpg',
            }}
            className='h-[400px] w-full'
          />
          <View>
            <Text className='text-black font-bold  px-6 text-[30px] text-center'>
              {detail.name}
            </Text>
            <Text className='text-center font-light text-[20px] uppercase'>
              Unixes Originals
            </Text>
            <Text className='text-center font-semi-bold text-[16px] capitalize'>
              White/Blue/Beige
            </Text>
            <Text className='text-center font-semi-bold text-[16px] capitalize'>
              Article number : HP8843
            </Text>
          </View>
          <View className='mx-auto w-[400px]'>
            <Text className='mt-4 capitalize text-[15px] leading-5  text-center text-slate-400 '>
              {detail.description}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className='bg-white px-4 my-10'
        >
          <TouchableOpacity
            className='w-[100px] shadow shadow-black bg-white mr-4'
            onPress={() => {
              setDisplayImage(detail?.mainImg);
            }}
          >
            <Image
              source={{
                uri: detail?.mainImg,
              }}
              className='h-[100px] w-full '
              style={{
                resizeMode: 'cover',
              }}
            />
          </TouchableOpacity>
          {detail?.Images.map((el) => {
            return (
              <TouchableOpacity
                key={el?.id}
                className='w-[100px] shadow shadow-black bg-white mr-4'
                onPress={() => {
                  setDisplayImage(el?.imgUrl);
                }}
              >
                <Image
                  source={{
                    uri: el?.imgUrl,
                  }}
                  className='h-[100px] w-full '
                  style={{
                    resizeMode: 'cover',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className='px-5'>
          <Text className='font-bold text-lg'>Size</Text>
          <View className='flex-row gap-2 mt-2 flex-wrap'>
            {sizes.map((el, i) => {
              return (
                <Text
                  onPress={() => {
                    setSelectedSize(el);
                  }}
                  className={
                    selectedSize === el
                      ? ' border-2 text-center w-[55px] border-black py-2 font-bold bg-black text-white'
                      : ' border-2 text-center w-[55px] border-black py-2 font-bold'
                  }
                  key={i}
                >
                  {el}
                </Text>
              );
            })}
          </View>
        </View>
        <TouchableOpacity className='w-fit'>
          <View className='bg-black w-[70%]  px-4 py-4  m-auto mt-6 rounded-sm mb-4 shadow-xl'>
            <Text className='w-fit text-white text-center font-bold'>
              BUY Rp {detail.price}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SpecifiedView>
  );
};

export default DetailScreen;
