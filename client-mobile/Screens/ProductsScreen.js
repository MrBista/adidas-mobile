import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import ErrorPage from '../components/ErrorPage';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import { GET_PRODUCTS } from '../queries/porduct';
const ProductsScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <ErrorPage />;
  }
  const products = data.getProducts || {};
  return (
    <ScrollView>
      <View className='flex flex-row flex-wrap  justify-center mb-6'>
        {products.map((el) => {
          return <ProductCard navigation={navigation} key={el.id} {...el} />;
        })}
      </View>
    </ScrollView>
  );
};

export default ProductsScreen;
