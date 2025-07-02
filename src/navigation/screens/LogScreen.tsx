import { SafeAreaView, View ,Image,Text, TouchableOpacity} from 'react-native';
import LoginInput from '../../components/LoginInput';
import React, { useState, useEffect } from 'react';

type LoginData = { email: string; password: string };

const LogScreen = ({ navigation }: { navigation: any }) => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loginData) {
      // Burada gerçek bir API isteği yapılabilir
      if (loginData.email === "gulsah@gulsah.com" && loginData.password === "1234") {
        setIsLoggedIn(true);
      } else {
        alert("Hatalı giriş!");
      }
    }
  }, [loginData]);
useEffect(() => {
  if (isLoggedIn) {
    navigation.navigate("HomeTabs");
  }
}, [isLoggedIn]);

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
 <LoginInput  onLogin={(email, password) => setLoginData({ email, password })} />

 
    </SafeAreaView>
  );
}
export default LogScreen;

