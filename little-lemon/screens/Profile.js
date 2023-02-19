import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch    } from 'react-redux';
import { signIn } from "../redux/user/userSlice";


export function ProfileScreen (){

    async function onPress() {
        try {
            let keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys);
        } catch (e) {
            console.error(e);
        }
        dispatch(signIn(false))
        console.log('Done')
    }

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    return (
        <View style={profileScreenStyle.container}>
        <Text>{user.name}</Text>
        <Pressable onPress={onPress} >
                    <Text >Next</Text>
                </Pressable>
        </View>
    )
}


const profileScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87ab69',
        justifyContent:'center',
        alignItems:'center'
    }
})