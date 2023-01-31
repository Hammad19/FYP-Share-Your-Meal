import React, { useState} from "react";
import { SafeAreaView, View, Text, ScrollView,StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../content";
import Icon from 'react-native-vector-icons/FontAwesome'
//import RangeSlider from 'react-native-range-slider'
//import Slider from 'rn-range-slider';
const Filter = ({navigation}) => {

    const [location, setLocation] = useState();
    const [cuisines, setCuisines] = useState(1);

    const [open, setOpen] = useState(false);
    const [creditCard, setCreditCard] = useState(false);
    const [free, setFree] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.item}>
                    <Text style={styles.title}>REGION</Text>
                    <TextInput value={location} placeholder="where do you live ?" style={styles.input} />
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>CUISINES</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(1)
                            }}
                            style={[styles.category, { borderColor: cuisines === 1 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 1 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(2)
                            }}
                            style={[styles.category, { borderColor: cuisines === 2 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 2 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}>American</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(3)
                            }}
                            style={[styles.category, { borderColor: cuisines === 3 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 3 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Asian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(4)
                            }}
                            style={[styles.category, { borderColor: cuisines === 4 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 4 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Burger</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(5)
                            }}
                            style={[styles.category, { borderColor: cuisines === 5 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 5 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Chineese</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(6)
                            }}
                            style={[styles.category, { borderColor: cuisines === 6 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 6 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Fast Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(7)
                            }}
                            style={[styles.category, { borderColor: cuisines === 7 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 7 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Italian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(8)
                            }}
                            style={[styles.category, { borderColor: cuisines === 8 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 8 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Mexican</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(9)
                            }}
                            style={[styles.category, { borderColor: cuisines === 9 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 9 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Pasta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(10)
                            }}
                            style={[styles.category, { borderColor: cuisines === 10 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 10 ?Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Rice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCuisines(11)
                            }}
                            style={[styles.category, { borderColor: cuisines === 11 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY }]}
                        >
                            <Text style={[styles.subtitle, { color: cuisines === 11 ? Colors.DEFAULT_YELLOW : Colors.DEFAULT_GREY}]}>Asian</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                     <Text style={styles.title}>FILTER</Text>  
                     <View style={styles.line} />
                     <TouchableOpacity
                        onPress={() => {
                            setOpen(!open);
                        }}
                        style={styles.rowFilter}
                    >
                        <Text style={styles.text}>Open Now</Text>
                        {
                            open && (
                                <Icon name="check" size={20} color={Colors.DEFAULT_YELLOW} />
                            )
                        }
                     </TouchableOpacity>
                     <View style={styles.line} />
                     <TouchableOpacity
                        onPress={() => {
                            setCreditCard(!creditCard);
                        }}
                        style={styles.rowFilter}
                    >
                        <Text style={styles.text}>Credit Card</Text>
                        {
                            creditCard && (
                                <Icon name="check" size={20} color={Colors.DEFAULT_YELLOW} />
                            )
                        }
                     </TouchableOpacity>
                     <View style={styles.line} />
                     <TouchableOpacity
                        onPress={() => {
                            setFree(!free);
                        }}
                        style={styles.rowFilter}
                    >
                        <Text style={styles.text}>Free Delivery</Text>
                        {
                            free && (
                                <Icon name="check" size={20} color={Colors.DEFAULT_YELLOW} />
                            )
                        }
                     </TouchableOpacity>  
                     <View style={styles.line} />        
                </View>
                <View style={styles.item}>
                    <Text style={styles.title}>PRICE RANGE ($)</Text>
                    {/* <Slider
                        min={0}
                        max={300}
                        handleColor={Colors.DEFAULT_YELLOW}
                        tintColor={Colors.DEFAULT_YELLOW}
                        handleDiameter={20}
                        tintColorBetweenHandles={Colors.DEFAULT_YELLOW}
                        lineHeight={5}
                        onChange={(min, max) => {}}
                    /> */}
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.buttonTxt}>Apply Filters</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Filter;

const styles = StyleSheet.create({ 

    container: {
        flex: 1,
        margin: 5,
    },
    item: {
        marginVertical: 10,
    },
    title: {
        color: Colors.DEFAULT_YELLOW,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
    },
    input: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: Colors.DEFAULT_GREY
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subtitle: {
        color: Colors.LIGHT_GREEN,
        fontWeight: '700',
        fontSize: 15,
    },
    category: {
        margin: 3,
        borderRadius: 15,
        borderWidth: 2,
        padding: 5,
        paddingHorizontal: 10,
    },
    text: {
        color: Colors.DEFAULT_GREEN,
        fontSize: 18,
    },
    line: {
        backgroundColor: Colors.DEFAULT_GREY,
        height: 1,
        marginVertical: 10,
    },
    rowFilter: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    button: {
        marginTop: 30,
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTxt: {
        color: Colors.DEFAULT_WHITE,
        fontWeight: 'bold',
        fontSize: 20,
    }
});