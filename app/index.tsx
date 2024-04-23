import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

{/* //TODO: fix this custom nativeWind styling issue (bg-primary is not being applied)    */ }
{/* //* using SafeAreaView so that the content is not hidden by the status bar or the notch and the content is shown within the safe area of any device */ }
export default function App() {
  const {loading, isLogged} = useGlobalContext()
  // console.log("values", loading, isLogged)
  if(!loading && isLogged){
    return(
      <Redirect href='/home' />
    )
  }
  return (
    <SafeAreaView className='bg-[#161622] h-full '>
      <ScrollView contentContainerStyle={{
        height: "100%"
      }}>

        <View className='w-full justify-center items-center h-full px-4 '>
          <Image source={images.logo} className='w-[130px] h-[84px] ' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px] ' resizeMode='contain' />
          <View className='relative mt-5'>
            <Text className='text-3xl font-bold text-center text-white'>Discover Endless Possibilities with {" "}<Text className='font-semibold text-[#FFA001]'>Aora</Text></Text>
            <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain' />
          </View>
          <Text className='text-sm font-pregular text-green-100 mt-7 text-center'>Where creativity meets innovation: embark on a journey of limitless  exploration with Aora</Text>
          <CustomButton title="Continue with Email"
            handlePress={() => { router.push("/sign-in") }}
            containerStyles="w-full mt-7"
            textStyles=''

          />

        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622'
        style='light' />
      {/* //* StatusBar makes the statusBar of our mobile visible in darkmode. the time and battery percentage will be visible in white color if style is light 
        */}
    </SafeAreaView>
  );
}

