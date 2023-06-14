import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import SpecifiedView from './SpecifiedView';

const Loader = () => {
  return (
    <SpecifiedView>
      <View className='h-full items-center justify-center flex '>
        <ActivityIndicator size='large' color='#222' />
      </View>
    </SpecifiedView>
  );
};

export default Loader;
