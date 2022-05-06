import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../components/styles/global.styles";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Footer from "../../components/Footer/Footer";
import { URI } from "../../domain/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomePoint from "../../components/cards/HomePoint";
import { useIsFocused } from "@react-navigation/native";
import { SELECT_GENERATOR } from "../../domain/constant";
import { getSetting } from "../../store/actions/setting_action";
import { useSelectAllProducts } from "../../shared/hooks/UseProduct";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/cards/ProductCard";

const Home = ({ navigation }) => {
  const {
    plr10,
    extra_big,
    logo,
    dflex,
    cart_icon,
    plr100,
    login_img,
    bggreen,
    footer,
    header,
    icon_box,
    plr20,
    ptb_50,
    h50,
    ml20,
    circle,
    shadowProp,
    checkout,

    w100,
    button_book,
    border,
    border_bottom,
    bgwhite,
    pb_10,
    drawer_bg,
    mr20,
    recent_view,
    h_100,
    wdt30,
    ht30,
    addcart,
    wdt25,
    ht25,
    wdt20,
    my_bag,
    ht20,
    pl10,
    button_color,
    flex_1,
    ptb_20,
    mt20,
    mt10,
    section,
    img_wh,
    bor50,
    clear_btn,
    card,
    bor_right,
    bor_right2,
    bor_bottom,
    bg_yellow,
    box_shadow,
    pb_200,
    only_flex,
    mb10,
    bor_f,
    button_explore,
    circle_top,

    icon,
    input,
    p20,
    heding,
    v_align,
    ml10,
    font_demi,
    button,
    center_self,
    bg_grey,
    mb20,
    editbutton,
    movedsaved,
    w33,
    plr50,
    h_180,
    font_bold,
    ptb_30,
    single_product_image,
    single_product_topbar,
    font_medium,

    heading,
  } = globalStyles;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.setting);
  const { setting, loading } = data;

  const isFocused = useIsFocused();
  const [generator, setGenerator] = useState(null);
  const [product] = useSelectAllProducts();

  const getGenerator = async () => {
    try {
      const value = await AsyncStorage.getItem(SELECT_GENERATOR);

      if (value !== null) {
        // value previously stored
        // console.log("FROM ACTION ", JSON.parse(value));
        // setLoading(false);
        setGenerator(JSON.parse(value));
      } else {
        // setLoading(true);
        setGenerator(null);
      }
    } catch (e) {
      // error reading value
      console.log(e);
      return null;
    }
  };
  useEffect(() => {
    if (isFocused) {
      getGenerator();
      dispatch(getSetting());
    }
  }, [isFocused]);
  console.log("LOADING", loading, "SETTING", setting);

  const RenderService = ({ item }) => {
    return (
      <View
        style={[flex_1, mr20]}
        key={`service_${Math.random(10000)}_${item.name}`}
      >
        <Image
          style={{ width: 35, height: 35, alignSelf: "center" }}
          source={{ uri: `${URI}${item.image}` }}
          defaultSource={require("../../assets/images/service-1.png")}
        />
        <View style={[mt10]}>
          <Text style={[font_medium, { textAlign: "center", fontSize: 12 }]}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[bg_grey, flex_1]}>
      <View style={[header]}>
        <View style={[dflex, plr20]}>
          <View style={[only_flex, plr10, mt10]}>
            <View style={[ml10]}>
              {generator ? (
                <View style={[only_flex, plr10]}>
                  <View style={[circle_top, v_align]}>
                    <Image
                      style={{ width: 35, height: 35, resizeMode: "contain" }}
                      source={{ uri: `${URI}${generator.image}` }}
                    />
                  </View>
                  <View>
                    <Text style={[heading]}>
                      {" "}
                      {generator && generator.name}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Pressable
                    onPress={() => navigation.navigate("SelectBikeBrands")}
                  >
                    <Text style={[heading]}> Select Generator </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          <View style={[dflex]}>
            <View style={[ml10]}>
              <Pressable onPress={() => navigation.navigate("Wallet")}>
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require("../../assets/images/Wallet.png")}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={[v_align, mt20, plr20]}>
          <Image
            style={{ width: "100%", height: 150, borderRadius: 10 }}
            source={{ uri: `${URI}${setting && setting.main_banner}` }}
            defaultSource={require("../../assets/images/header-banner.png")}
          />
        </View>
        <View style={[section, mt20]}>
          <View style={[p20]}>
            <Text style={[font_bold]}>
              {setting && setting.service_1_title}{" "}
            </Text>
            <Text style={[bor_bottom]}></Text>
          </View>
          <View style={[dflex, plr20, { alignContent: "center" }]}>
            {setting && setting.service_1 && (
              <FlatList
                data={setting.service_1}
                renderItem={(item) => {
                  return <RenderService item={item.item} />;
                }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
              ></FlatList>
            )}
          </View>
        </View>
        <View style={[section]}>
          <View style={[p20]}>
            <Text style={[font_bold]}>
              {setting && setting.service_2_title}{" "}
            </Text>
            <Text style={[bor_bottom]}></Text>
          </View>
          <View style={[dflex, plr20, { alignContent: "center" }]}>
            {setting && setting.service_2 && (
              <FlatList
                data={setting.service_2}
                renderItem={(item) => {
                  return <RenderService item={item.item} />;
                }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
              ></FlatList>
            )}
          </View>
        </View>
        <View style={[section]}>
          <View style={[p20]}>
            <Text style={[font_bold]}>
              {setting && setting.service_3_title}{" "}
            </Text>
            <Text style={[bor_bottom]}></Text>
          </View>
          <View style={[dflex, plr20, { alignContent: "center" }]}>
            {setting && setting.service_3 && (
              <FlatList
                data={setting.service_3}
                renderItem={(item) => {
                  return <RenderService item={item.item} />;
                }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
              ></FlatList>
            )}
          </View>
        </View>

        <View style={[bgwhite, mt10]}>
          <View style={[v_align, mt20, plr20]}>
            {setting && (
              <Image
                style={{ width: "100%", height: 150, borderRadius: 10 }}
                source={{ uri: `${URI}${setting.book_service_banner}` }}
                defaultSource={require("../../assets/images/2nd-banner.png")}
              />
            )}
          </View>
        </View>
        <View style={[p20]}>
          <Text style={[font_bold]}>Explore Our Products </Text>
          <Text style={[bor_bottom]}></Text>
          <View style={{ marginVertical: 10 }}>
            {product && product.all_products && (
              <FlatList
                data={product.all_products.filter((item, index) => index < 10)}
                renderItem={(item) => {
                  return <ProductCard item={item.item} />;
                }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
              ></FlatList>
            )}
          </View>
        </View>
        <View style={[mt10]}>
          <Pressable onPress={() => navigation.navigate("AllProducts")}>
            <View style={[button_explore]}>
              <Text style={[font_bold]}>Explore All</Text>
            </View>
          </Pressable>
        </View>
        {setting && (
          <View style={[bgwhite, mt10]}>
            <View style={[v_align, mt20, plr20]}>
              <Image
                style={{ width: "100%", height: 96, borderRadius: 10 }}
                source={{ uri: `${URI}${setting.offer_banner}` }}
                defaultSource={require("../../assets/images/banner-3.png")}
              />
            </View>
          </View>
        )}
        {setting && (
          <View style={[plr20, mb20]}>
            <Text style={[mb10, font_bold]}>{setting.service_4_title}</Text>
            <Text style={[font_medium]}>{setting.service_4_description}</Text>
          </View>
        )}

        <View style={[bgwhite]}>
          <View style={[plr20, card, mt20, dflex]}>
            {setting && setting.service_4 && (
              <FlatList
                data={setting.service_4}
                renderItem={(item) => {
                  return <RenderService item={item.item} />;
                }}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
              ></FlatList>
            )}
          </View>
        </View>
        <View
          style={[bg_yellow, { paddingVertical: 30, paddingHorizontal: 20 }]}
        >
          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Text style={[mb10, font_bold]}>
              {" "}
              {setting && setting.book_service_title}{" "}
            </Text>
            <Text style={[font_medium]}>
              {setting && setting.book_service_content}
            </Text>
            <View style={[mt20]}>
              <Pressable onPress={() => navigation.navigate("BookService")}>
                <Text style={[button_book, font_bold]}>BOOK NOW</Text>
              </Pressable>
            </View>
          </View>
        </View>
        {setting && (
          <View style={[bgwhite, mt10]}>
            <View style={[v_align, mt20, plr20]}>
              <Image
                style={{ width: "100%", height: 96, borderRadius: 10 }}
                source={{ uri: `${URI}${setting.offer_footer_banner}` }}
                defaultSource={require("../../assets/images/banner-4.png")}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
