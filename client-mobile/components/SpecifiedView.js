import { Platform, SafeAreaView, View } from 'react-native';
import { SafeAreaView as AndoridArea } from 'react-native-safe-area-context';
const SpecifiedView = ({ children, style }) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  ) : (
    <AndoridArea style={style} edges={['right', 'bottom', 'left', 'top']}>
      {children}
    </AndoridArea>
  );
};

export default SpecifiedView;
