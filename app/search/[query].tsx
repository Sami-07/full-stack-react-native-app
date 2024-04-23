import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../hooks/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
  const { query } = useLocalSearchParams()
  const { data: posts, refetch } = useAppwrite(()=>searchPosts(query))
// console.log("res", query, posts)
  useEffect(() => {
    refetch()

  }, [query])
  return (
    <SafeAreaView className='bg-black h-full '>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard videContent={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 '>
            <Text className='fontr-pmedium text-sm text-gray-100'>Search Results</Text>
            <Text className='font-psemibold text-2xl text-white'>{query}</Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
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

export default Search