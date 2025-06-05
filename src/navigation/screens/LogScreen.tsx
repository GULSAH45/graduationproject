
import { SafeAreaView, View ,Image,Text} from 'react-native';
import LoginInput from '../../components/LoginInput';

const LogScreen = () =>  {
  return ( 
    <SafeAreaView className='flex-1 bg-MainBackground'>
<View className='items-center justify-center'>
    <Image
      source={require('../../assets/LOGO.png')}
      className='w-[119px] h-[26px] mb-5 mt-10'
      resizeMode='contain'
    />

<Text className='text-3xl text-TextColor text-center  mb-3 font-extrabold'>
  Giriş Yap
</Text>

</View>
    <View className='flex-1 '>
      <LoginInput  />
    </View>
    </SafeAreaView>
  );
}
export default LogScreen;

