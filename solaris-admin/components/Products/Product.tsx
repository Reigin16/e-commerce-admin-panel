import { useState } from "react";
import { Text} from 'react-native'
import { Button, Card, Image,  darkColors } from "@rneui/base";


const ProductCard = (props: any) => {
   
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
        
        
        <Card containerStyle={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, maxWidth: 600, margin: 'auto', marginTop: 14, marginBottom: 14}}>
            <Image style={{
    width: 300,
    height: 200,
    resizeMode: 'contain',
  }} source={{uri:`https://firebasestorage.googleapis.com/v0/b/dashboard-d7e5d.appspot.com/o/${props.image}?alt=media`}} />
            <Text style={{ color: 'white'}}>{props.productname}</Text>
            <Text style={{fontSize: 13, color: 'white'}}>{props.description}</Text>
            <Text style={{fontSize: 13, color: 'white', }}>$ {props.price}</Text>
            <Button type="solid" onPress={deleteProduct}>Delete</Button>
        </Card>
        
       
    )
}
export default ProductCard