import React from 'react';
import { Text, View } from 'react-native';
import SpecifiedView from './SpecifiedView';

const ErrorPage = () => {
  return (
    <SpecifiedView>
      <View className='h-full items-center justify-center flex '>
        <Text className='text-red-400 text-[40px]'>
          Internal Server Error !
        </Text>
      </View>
    </SpecifiedView>
  );
};

export default ErrorPage;
