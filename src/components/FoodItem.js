import React from 'react';
import {View, Text, Image, Pressable,StyleSheet,TouchableOpacity} from 'react-native';  
import { useNavigation } from '@react-navigation/native';
import { Entypo as Icon,MaterialIcons } from "@expo/vector-icons";
import { Colors } from '../content';
import { Display } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuserlisting } from '../store/slices/userlistingSlice';
const days = 7;

const Post = (props) => {


  const post = props.post;
  const[isSharePage,setIsSharePage] = React.useState(false);
  const navigation = useNavigation();

  const goToPostPage = () => {
    navigation.navigate('FoodDetailScreen', {post: post});
  }

  
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const deleteFood = (id) => 
  {
    console.log("DeleteFood");
    console.log(post);
    let requestBody = {_id: id};
    console.log(requestBody);
    dispatch(deleteuserlisting(requestBody));
  };
  
  return (
<>

  
    <Pressable onPress={goToPostPage} style={styles.container}>


      {/* Image  */}
      <Image
        style={styles.image}
        source={{uri: post.food_image}}
      />

      {/* Bed & Bedroom  */}
      <View style={styles.details}>

        <Text style={styles.detailText}>
        Gives away By Hammad Waseem</Text>

        <View style={styles.ratingtext}>
        <Icon name="star" color={Colors.DEFAULT_YELLOW} size={18} />
        <Text >4.93 (891)</Text>
        </View>
        
      </View>

      {/* Type & Description */}
      <Text style={styles.description} numberOfLines={2}>
        {post.food_category}. {post.food_name}
      </Text>

      {/*  Old price & new price */}
      <Text style={styles.prices}>
        <Text style={styles.oldPrice}>${post.oldPrice}</Text>
        <Text style={styles.price}>  ${post.newPrice} </Text>
        / Per Serving
      </Text>

      {/*  Total price */}
      <Text style={styles.totalPrice}>{post.food_quantity} Servings Total</Text>
        

      {state.userlisting.isSharePage && (
      <View style={{flexDirection: 'row',justifyContent:'space-between',marginTop:10,}}>
      <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}>
          <Text style={styles.cartButtonText}><Icon name='edit' size={18}></Icon>Edit Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
        
          onPress={() => deleteFood(post._id)}
          activeOpacity={0.8}>
          <Text style={styles.cartButtonText}><MaterialIcons name="delete" size={18} />Delete post</Text>
        </TouchableOpacity>
      </View>
      )}
    </Pressable>
    
    </>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingtext: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "grey",
    paddingVertical: 8,
    flexDirection: "row",
    right: 2,
    position: "absolute",
    paddingLeft: 10,
    
  },

  detailText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "grey",
    paddingVertical: 8,
    
  },
    container: {
      marginHorizontal: 15,
      paddingBottom: 15,

    },
    image: {
      width: '100%',
      aspectRatio: 3 / 2,
      resizeMode: 'cover',
      borderRadius: 10,
      
    },
  
    bedrooms: {
      marginVertical: 10,
      color: '#5b5b5b',
    },
    description: {
      fontSize: 18,
      lineHeight: 26,
    },
    prices: {
      fontSize: 18,
      marginVertical: 10,
    },
    oldPrice: {
      color: '#5b5b5b',
      textDecorationLine: 'line-through',
    },
    price: {
      fontWeight: 'bold',
    },
    totalPrice: {
      color: '#5b5b5b',
      textDecorationLine: 'underline',
    },
  
    cartButton: {
      backgroundColor: Colors.DEFAULT_YELLOW,
      flexDirection: 'row',
    
      height: Display.setHeight(6),
      width: Display.setWidth(45),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    cartButtonText: {
      color: Colors.DEFAULT_WHITE,
      fontSize: 16,
      lineHeight: 16 * 1.4,
      fontFamily: "Poppins_500Medium",
    },
  });

export default Post;