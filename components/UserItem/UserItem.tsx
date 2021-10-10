import React from "react";
import { Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User } from "../../src/models";

export default function UserItem({ user }) {
  const navigation = useNavigation();

  const onPress = async () => {
    // const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    console.log(dbUser);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: user.imageUri }} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
    </Pressable>
  );
}
