
import { StyleSheet, Text, View, TouchableOpacity ,StatusBar } from "react-native";
import { useValidation } from "react-native-form-validator";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
import { Colors, Images } from "../content";
import { Separator } from "../components";
import { Display } from "../utils";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { addFood } from "../store/slices/foodSlice";


import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import AntDesign from "react-native-vector-icons/AntDesign";

const InsertFoddItemScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);


  const [foodName, setfoodName] = useState("");
  const [foodPrice, setfoodPrice] = useState("");
  const [foodQuantity, setfoodQuantity] = useState("");
  const [foodDescription, setfoodDescription] = useState("");
  const [foodImage, setfoodImage] = useState("");
  const [foodCategory, setfoodCategory] = useState("");
  const [accounttype, setaccounttype] = useState("");
  const [fieldname, setFieldName] = useState("");
  const [isAllValuesNull, setisAllValuesNull] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Giveaway", value: "Giveaway" },
    { label: "Sell", value: "sell" },
  ]);

  const [delivery, setDelivery] = useState(true);
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const {
    validate,
    isFieldInError,
    getErrorsInField,
    getErrorMessages,
    isFormValid,
  } = useValidation({
    state: { foodName, foodPrice, foodQuantity, foodDescription, foodCategory },
  });

  const validateNull = () => {
    if (
      foodName?.length < 1 ||
      foodPrice?.length < 1 ||
      foodQuantity?.length < 1 ||
      foodDescription?.length < 1 ||
      foodCategory?.length < 1
    ) {
      setisAllValuesNull(true);
    } else {
      setisAllValuesNull(false);
    }
  };

  function ShowError(textfieldname) {
    return (
      isFieldInError(textfieldname) && (
        <Text style={{ color: "red", fontSize: 12, marginLeft: 25 }}>
          {getErrorsInField(textfieldname)[0]}
        </Text>
      )
    );
  }

  useEffect(() => {
    validateField();
  },[foodName,foodPrice,foodQuantity,foodDescription,foodCategory]);


  const validateField = () => {

    if(fieldname == "foodName"){
      validate({
        foodName: {required: true ,minlength: 2, maxlength: 30},
      });
    }
    else if(fieldname == "foodPrice"){
      validate({
        foodPrice: {required: true ,minlength: 1, maxlength: 10, numbers: true},
      });
    }
    else if(fieldname == "foodQuantity"){
      validate({
        foodQuantity: {required: true ,minlength: 1, maxlength: 10, numbers: true},
      });
    }
    else if(fieldname == "foodDescription"){
      validate({
        foodDescription: {required: true ,minlength: 20, maxlength: 300},
      });
    }
    else if(fieldname == "foodCategory"){
      validate({
        foodCategory: {required: true},
      });
    }
  }


  const handleonPress = () => {
    setError(false);
    validate({
      foodName: {required: true ,minlength: 2, maxlength: 30},
      foodPrice: {required: true ,minlength: 1, maxlength: 10, numbers: true},
      foodQuantity: {required: true ,minlength: 1, maxlength: 10, numbers: true},
      foodDescription: {required: true ,minlength: 20, maxlength: 300},
      foodCategory: {required: true},

    });

    console.log(isFormValid());
    setTimeout(() => {
      setisAllValuesNull(false);
    }, 2000);

    validateNull();

    let requestBody = {
      food_name: foodName,
      food_description: foodDescription,
      food_price: foodPrice,
      food_image: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
      food_category: "All",
      food_quantity: foodQuantity,
      food_shared_by: state.auth.user.email,
      is_free: foodCategory=="Giveaway"?true:false

    };

    if (
      isFormValid() &&
      foodName.length > 0 &&
      foodDescription.length > 0 &&
      foodPrice.length > 0 &&
      foodQuantity.length > 0 &&
      foodCategory.length > 0
    ) {
      //dispattch the action and then print the state
      console.log(state.food, "food state");
      dispatch(addFood(requestBody))
    
    }
  };

 
  return (
    fontsLoaded && (
      <>
       <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={Colors.DEFAULT_WHITE}
          translucent></StatusBar>
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <IonIcons
            name="chevron-back-outline"
            size={30}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.headertitle}>Add Your Food</Text>
        </View>
        <View style={styles.inputImageContainer}>
        <View style={styles.inputSubContainer }>
            <IonIcons
              name="image-outline"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setfoodImage(text);
              }}
              // onEndEditing={() => }
              value={foodImage}
              placeholder="Select Food Image"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        <Separator height={15} />
        <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <IonIcons
              name="md-fast-food-outline"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodName");
                setfoodName(text);
              }}
              // onEndEditing={() => }
              value={foodName}
              placeholder="Food Name"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodName")}
          <Separator height={15} />
        <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
            <IonIcons
              name="pricetags-outline"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodPrice");
                setfoodPrice(text);
              }}
              // onEndEditing={() => }
              value={foodPrice}
              placeholder="Food Price"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodPrice")}
          <Separator height={15} />
          <View style={styles.inputContainer }>
        <View style={styles.inputSubContainer }>
            <MaterialIcons
              name="details"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodDescription");
                setfoodDescription(text);
              }}
              // onEndEditing={() => }
              value={foodDescription}
              placeholder="Food Description"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodDescription")}
          <Separator height={15} />
          <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer }>
            <MaterialIcons
              name="number"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              onChangeText={(text) => {
                setError(true);
                setFieldName("foodQuantity");
                setfoodQuantity(text);
              }}
              // onEndEditing={() => }
              value={foodQuantity}
              placeholder="Food Quantity"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
            />
          </View>
        </View>
        {error && ShowError("foodQuantity")}
          <Separator height={15} />
        <DropDownPicker
          style={styles.inputContainer}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholderStyle={styles.dropdownstyles}
          listParentLabelStyle={styles.dropdownstyles}
          dropDownContainerStyle={styles.dropdowncontainerstyle}
          labelStyle={styles.dropdownstyles}
          placeholder="Select Food Category"
          onSelectItem={(item) => {
            // setError(true);
            // setFieldName("accounttype");
            // console.log(item.value);
            setfoodCategory(item.value);
          }}
        />

        {error && ShowError("foodCategory")}
        {isAllValuesNull ? (
          <Text style={{ color: "red", fontSize: 15, marginLeft: 25 }}>
            All fields are required
          </Text>
        ) : null}
        <TouchableOpacity onPress={handleonPress}  style={styles.signinButton}>
          <Text style={styles.signinButtonText}>Upload Food</Text>
        </TouchableOpacity>
        </View>

      </>
    )
  );
};

export default InsertFoddItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headertitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    height: Display.setHeight(8),
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: "center",
    borderColor: Colors.LIGHT_GREY2,
  },
  inputImageContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    height: Display.setHeight(20),
    marginHorizontal: 20,
    width: Display.setWidth(90),
    borderRadius: 8,
    borderWidth: 0.5,
    textAlign: "center",
    justifyContent: "center",
    borderColor: Colors.LIGHT_GREY2,
  },

  dropdownstyles: {
    fontSize: 18,
    textAlignVertical: "center",
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  dropdowncontainerstyle: {
    width: Display.setWidth(90),
    marginLeft: 20,
    justifyContent: "center",
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: "Poppins_700Bold",
  },
});
