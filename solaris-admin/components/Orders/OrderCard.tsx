import { View, Text, Button } from 'react-native';
import { darkColors } from '@rneui/themed';

const OrderCard = (props) => {
  const cancelOrder = () => {
    fetch('https://backdoor.onrender.com/orders/orderstatus', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: props.date,
        email: props.email,
        status: 'Canceled',
      }),
    })
      .then((res) => res.json())
      .then((ords) => {
        props.refreshOrders();
      });
  };

  const shipOrder = () => {
    fetch('https://backdoor.onrender.com/orders/orderstatus', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: props.date,
        email: props.email,
        status: 'Shipped',
      }),
    }).then((res) => res.json())
      .then((ords) => {
        props.refreshOrders();
      }).catch(e => console.log(e));
      
  };

  const completedOrder = () => {
    fetch('https://backdoor.onrender.com//orders/orderstatus', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: props.date,
        email: props.email,
        status: 'Completed',
      }),
    })
      .then((res) => res.json())
      .then((ords) => {
        props.refreshOrders();
      });
  };
  let d = new Date(props.date);
  return (
    <View style={{backgroundColor: darkColors.background, borderWidth: 2, borderColor: darkColors.greyOutline, margin: 'auto', maxWidth: 600, marginBottom: 14, marginTop: 14}}>
      <Text style={{color: 'white'}}>:{d.toUTCString()}</Text>
      <Text style={{ color: 'white' }}>{props.username}</Text>
      <Text style={{ color: 'white' }}>{props.email}</Text>
      <Text style={{ color: 'white' }}>{props.products}</Text>
      <Text style={{ color: 'white' }}>{props.price}</Text>
      <Text style={{ color: 'white' }}>:{props.address}</Text>
      <Text style={{ color: 'white' }}>{props.status}</Text>
        <Button title={'Cancel'} onPress={cancelOrder} />
        <Button title={'Ship'} onPress={shipOrder} />
        <Button title={'Complete'} onPress={completedOrder} />
      </View>
  );
};
export default OrderCard;
