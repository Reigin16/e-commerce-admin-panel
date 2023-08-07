import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { useState } from "react";
import { darkColors, Card } from "@rneui/themed";

const OrderCard = (props) => {
   const cancelOrder = () => {

        fetch('https://backdoor.onrender.com/orders/orderstatus', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: props.date,
                email: props.email,
                status: 'Canceled',
            })

        }).then(res => res.json())
            .then(ords => {
                props.refreshOrders();
            })
            
    }


   const shipOrder = () => {

        fetch('https://backdoor.onrender.com/orders/orderstatus', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: props.date,
                email: props.email,
                status: 'Shipped',
            })

        }).then(res => res.json())
            .then(ords => {
                props.refreshOrders();
            })

    }


   const completedOrder = () => {

        fetch('https://backdoor.onrender.com//orders/orderstatus', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date:props.date,
                email: props.email,
                status: 'Completed',
            })

        }).then(res => res.json())
            .then(ords => {
               props.refreshOrders();
            })

    }
    let d = new Date(props.date)
    return (
        <Card containerStyle={{backgroundColor: darkColors.background, margin: 'auto', marginBottom: '14px', marginTop: '14px'}}>
            <Text style={{color: 'white'}}><strong>Order placed: </strong> {d.toUTCString()}</Text>
           
                <Text style={{color: 'white'}}>
                    <strong>Username:</strong> {props.username}
                </Text>
                <Text style={{color: 'white'}}>
                    <strong>Email:</strong> {props.email}
                </Text>
                <Text style={{color: 'white'}}>
                    <strong>Products:</strong> {props.products}
                </Text>
                <Text style={{color: 'white'}}>
                    <strong>Price:</strong> $ {props.price}
                </Text>
                <Text style={{color: 'white'}}>
                    <strong>Address:</strong> {props.address}
                </Text>
                <Text style={{color: 'white'}}>
                    <strong>Status:</strong> {props.status}
                </Text>
                <div>
                    <Button  size='sm' onPress={cancelOrder} style={{ margin: '1em' }}>Cancel</Button>
                    <Button  size='sm' onPress={shipOrder} style={{ margin: '1em' }}>Ship</Button>
                    <Button  size='sm' onPress={completedOrder} style={{ margin: '1em' }}>Complete</Button>
                </div>
           
        </Card>
       
  
    )


}
export default OrderCard