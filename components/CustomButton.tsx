import react from "react";
import {TouchableOpacity, Text} from "react-native";

export default function CustomButton({title, handlePress, containerStyles, textStyles, isLoading} : {
    title: string,
    handlePress: ()=>void,
    containerStyles: string,
    textStyles?: string,
    isLoading?: boolean

}){
    return(
        <TouchableOpacity className={`bg-[#FFA001] rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""}`} disabled={isLoading} onPress={handlePress}>
            
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}