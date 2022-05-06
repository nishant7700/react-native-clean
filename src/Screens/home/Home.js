import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Container,
  Row,
  Col4,
  Col12,
  Card,
  CardBody,
  CardTitle,
  H1,
  P,
  Btn,
  FullImage,
  Col6,
} from "../../components/styles/Styles";
import SkeletonContent from "react-native-skeleton-content";
import ProgressiveImage from "../../components/layout/ProgresssiveImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("TOKEN");
        if (value !== null) {
          // value previously stored
          setToken(value);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);
  return (
    <View>
      <Container style={{ marginTop: 20 }}>
        <Row>
          <Col6>
            <AntDesign name="stepforward" size={24} color="black" />
            <FontAwesome5 name="envelope" size={24} color="red" />
            <Card
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 2,
              }}
            >
              <ProgressiveImage
                defaultImageSource={require("../../assets/default.png")}
                source={{
                  uri: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
                }}
                style={{ width: "100%", height: 150 }}
                resizeMode="cover"
              />
              <CardBody>
                <CardTitle>
                  <H1 style={{ color: "#666" }}>
                    Featured Services Token: {token}
                  </H1>
                </CardTitle>

                <P color="#000">{token}</P>
                <Btn success textWhite width="100px" style={{ elevation: 2 }}>
                  Text
                </Btn>
              </CardBody>
            </Card>
          </Col6>
          <Col6>
            <SkeletonContent
              containerStyle={{ elevation: 1, border: 1 }}
              isLoading={true}
              layout={[
                { key: "someId", width: "100%", height: 150, marginBottom: 10 },
                { key: "someOtherId", width: 50, height: 20, marginBottom: 6 },
                {
                  key: "someOtherId",
                  width: "100%",
                  height: 10,
                  marginBottom: 6,
                },
                {
                  key: "someOtherId",
                  width: 100,
                  height: 25,
                },
              ]}
            >
              <Card
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 2,
                }}
              >
                <FullImage
                  height={150}
                  source={{
                    uri: `https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__480.jpg`,
                  }}
                />
                <CardBody>
                  <CardTitle>
                    <H1 style={{ color: "#666" }}>Featured Services</H1>
                  </CardTitle>

                  <P color="#000">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem, sunt reprehenderit. Sequi earum
                  </P>
                  <Btn success textWhite width="100px" style={{ elevation: 2 }}>
                    Text
                  </Btn>
                </CardBody>
              </Card>
            </SkeletonContent>
          </Col6>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col12>
            <ImageBackground
              source={{
                uri: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg",
              }}
              resizeMode="cover"
              style={{ width: "100%", height: 250 }}
            >
              <Text style={{ color: "#fff" }}>Inside</Text>
            </ImageBackground>
          </Col12>
        </Row>
      </Container>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
