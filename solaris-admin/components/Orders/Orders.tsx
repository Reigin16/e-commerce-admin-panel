import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { darkColors } from "@rneui/themed";
import OrderCard from "./OrderCard";
import { SafeAreaView, ScrollView } from "react-native";
const Orders = () => {
    let [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('https://backdoor.onrender.com/orders/orders')
            .then(response => response.json())
            .then(items => setOrders(items));

      
    })
    const refresh = () => {
        fetch('https://backdoor.onrender.com/orders/orders')
            .then(response => response.json())
            .then(items => setOrders(items));

    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
        <ScrollView scrollEnabled={true}>
        <View style={{ backgroundColor: darkColors.background }}>
            <View>
                <View>

                    {orders.length !== 0  ? (
                        orders?.map((order: any) => {
                            return (
                                <OrderCard
                                key={order?.date}
                                date={order?.date}
                                products={order?.productnames}
                                price={order?.price}
                                address={order.address}
                                status={order?.status}
                                refreshOrders={refresh}
                                email={order?.email}
                                username={order?.username}
                                />)

                        })
                    ) : null}
                </View>


            </View>

        </View>
        </ScrollView>
        </SafeAreaView>
    )
}
export default Orders