import { useState } from "react";
import { Button, Input, darkColors, useTheme} from '@rneui/themed'
import { View } from "react-native";

const AddProduct = ({navigation}) => {
    const [productname, setProductname] = useState()
    const {theme} = useTheme()
    const [image, setImage] = useState('some')
    const [price, setPrice] = useState()
    const [type, setType] = useState('Mobile')
    const [description, setDescription] = useState()
  const  onProductChange = (event) => {
      setProductname(event.target.value)

    }

  const  onPriceChange = (event) => {
      setPrice(event.target.value)

    }

   const  onDescriptionChange = (event) => {
    setDescription(event.target.value)

    }

  const  onTypeChange = (event) => {
    console.log(event.target.value)
   setType(event.target.value)

    }

  const  onImageChange = (event) => {
     setImage(event.target.files[0])
    }
    const addprd = () => {
      if (productname && price && type && description && image) {
        let formdata = new FormData()
        formdata.append('productname', productname)
        formdata.append('price', price)
        formdata.append('description', description)
        formdata.append('type', type)
        formdata.append('image', image)
        fetch('https://backdoor.onrender.com/products/addproduct', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(prd => {
                if (prd.productname) {
                    navigation.navigate('Products')
                }
            })
            .catch(err => alert(`${err}`))
    } else {
        alert("Please fill in all the required fields.")
    }
}
return (
    <View style={{backgroundColor: theme.colors.background}}>
        <form style={{backgroundColor: darkColors.background}}>
            <Input style={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, color: 'white'}} placeholder="Product Name" onChange={onProductChange} value={productname} />
            <Input style={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, color: 'white'}} placeholder="Description" onChange={onDescriptionChange} value={description} />
            <Input style={{backgroundColor: darkColors.background, borderColor: darkColors.greyOutline, color: 'white'}} placeholder="Price" onChange={onPriceChange} value={price} />
            <select onChange={onTypeChange}>
                <option value={'Mobile'}>Mobile</option>
                <option value={'Laptop'}>Laptop</option>
                <option value={'Food'}>Food</option>
                <option value={'Misc'}>Misc</option>
            </select>
            
            <Button onPress={addprd}>Add</Button>
        </form>
    </View>
)

}
export default AddProduct