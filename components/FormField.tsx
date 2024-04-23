import react, { useState } from "react"
import {View, Text, TextInput, TouchableOpacity, Image} from "react-native"
import { icons, images } from "../constants"

export default function FormField({title, value, handleChangeText, otherStyles, placeholder, ...props} : {title : string, value : string, handleChangeText : (e : string)=>void, otherStyles? : string, keyboardType? : string, placeholder? : string}){
    const [showPassword, setShowPassword] = useState(false)
    return(
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
            <View className="w-full h-16 px-4 bg-gray-800 rounded-2xl focus:border focus:border-[#FFA001] items-center flex-row">
                <TextInput className="flex-1 text-white font-psemibold text-base" value={value} placeholder={placeholder}
                placeholderTextColor={"#7b7b8b"} 
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
                />
                {
                    title === "Password" &&(
                        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
                            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />

                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}