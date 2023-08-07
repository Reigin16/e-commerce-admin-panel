import { useState } from "react";
import { Button, Card, Image, darkColors } from "@rneui/base";
import { useTheme, Text } from "@rneui/themed";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

const ProductCard = (props: any) => {
    const {theme} = useTheme()
    const deleteProduct = () => {
        let result = window.confirm('You sure.?');
        if (result) {
            fetch('https://backdoor.onrender.com/products/deleteproduct', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productname: props.productname})

            }).then(res => res.json())
                .then(msg => {
                    if (msg === 'Done') {
                        props.refresh()
                    }
                })

        }
    }

    return (
        
        
        <Card containerStyle={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, maxWidth: '600px', margin: 'auto', marginTop: '14px', marginBottom: '14px'}}>
            <Card.Image source={`https://firebasestorage.googleapis.com/v0/b/dashboard-d7e5d.appspot.com/o/${props.image}?alt=media`} />
            <Text style={{ color: 'white'}}>{props.productname}</Text>
            <Text style={{fontSize: 13, color: 'white'}}>{props.description}</Text>
            <Text style={{fontSize: 13, color: 'white', }}>$ {props.price}</Text>
            <Button type="solid" onPress={deleteProduct}>Delete</Button>
        </Card>
        
       
    )
}
export default ProductCard