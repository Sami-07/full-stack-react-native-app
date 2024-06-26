import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../hooks/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
const Profile = () => {

  // TODO: Implement follow/unfollow functionality for users and display followers count

  const { query } = useLocalSearchParams()
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id))
  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/sign-in");
  }
  return (
    <SafeAreaView className='bg-primary h-full '>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard videContent={item} />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity className='w-full items-end mb-10'
              onPress={logout}>
              <Image source={icons.logout} className='w-6 h-6' resizeMode='contain' />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-yellow-400 rounded-lg justify-center items-center'>
              <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
            </View>
            <InfoBox title={user?.username} subtitle='' containerStyles="mt-5" titleStyles="text-lg" />
            <View className='mt-5 flex-row'>

              <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles="mt-5 mr-10" titleStyles="text-xl" />
              <InfoBox title={"1.2k"} subtitle='Followers' containerStyles="mt-5 " titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title='No Videos Found' subTitle='No vides found for this search query' />
        )}

      />
    </SafeAreaView>
  )
}

export default Profile