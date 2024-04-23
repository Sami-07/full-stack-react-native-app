import react, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native"
import { icons, images } from "../constants"
import { router, usePathname } from "expo-router"

export default function SearchInput({ initialQuery }) {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "");

    return (

        <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl focus:border focus:border-[#FFA001] items-center flex-row space-x-4">
            <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" value={query} placeholder="Search for a video topic..."
                placeholderTextColor={"#7b7b8b"}
                onChangeText={(e) => setQuery(e)}

            />
            <TouchableOpacity onPress={() => {
                if (!query) return Alert.alert("Missing Query", "Please enter a query to search");
                if (pathname.startsWith("/search")) {
                    router.setParams({ query })

                }
                else {
                    router.push(`/search/${query}`)
                }
            }}>
                <Image source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>

        </View>
    )
}