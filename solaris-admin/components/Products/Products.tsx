import { useState, useEffect } from "react";
import { View } from "react-native";
import { useTheme} from "@rneui/themed";
import { Button, darkColors } from "@rneui/base";
import ProductCard from "./Product";
import { TouchableOpacity, ScrollView, SafeAreaView } from "react-native";


const Products = ({navigation }) => {
    const [products, setProducts] = useState([])

        let controller = new AbortController()

        
    useEffect(() => {
        fetch('https://backdoor.onrender.com/products/getproducts', {
            signal: controller.signal
        })
        .then(response => response.json())
        .then(items => setProducts(items));
        
        return () => {
            controller.abort()
        }
    })
    const refresh = () => {
        fetch('https://backdoor.onrender.com/products/getproducts')
            .then(response => response.json())
            .then(items => setProducts(items));

    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView scrollEnabled={true}>
        <View style={{backgroundColor: darkColors.background}}>
        
            <div id="product-wrapper">
                {products.map((item) => {
                    return (
                        <ProductCard  key={item.productname}
                        productname={item.productname}
                        description={item.description}
                        price={item.price}
                        image={item.image} 
                        refresh={refresh}
                        />
                    )
                })}
            </div>
        </View> 
        </ScrollView>
        </SafeAreaView>
    )
} 
export default Products