import { Image, StyleSheet, Platform, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, FlatList, Keyboard, ActivityIndicator} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { Link } from 'expo-router';
import { Stack } from 'expo-router';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import {globalStyles} from '../../styles/global';
import '../../src/localization/i18n';
import { useTranslation } from 'react-i18next'; 
import {apiCall, apiCall2, handleLogout, showToastMessage} from '../../src/commonfunctions';
import Toast from 'react-native-toast-message';


import { useSession } from '../../src/context/SessionContext';

export default function HomeScreen() {

  const { t } = useTranslation();
  const [myMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const listRef = useRef<FlatList>(null);
  const messages = [];
  let messageID = 0 ;
  const [qNumber, setQNumber] = useState(1)
  const flatListRef = useRef(null);

  const { mSessionToken, setmSessionToken } = useSession();
 
  const [nextMessageID, setNextMessageID] = useState(0); 
  //const [messageArray, setMessageArray] = useState([{ id: 1, role: "assistant", content: t("screens.index.assistantfirstmessage"), time: "..." },]);
  const [messageArray, setMessageArray] = useState([]);
  const [isMesageDisabled, setIsMessageDisabled] = useState(true);

  const [conversationID, setConversationID] = useState(0);



  const scrollToTop = (isAnimated = false) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: isAnimated});
    }
  };


 

  const startNewConversation = async() => {

    setMessageArray([]);
    setIsMessageDisabled(true);

    console.log("============================="); 
    console.log(mSessionToken)
    console.log("conversationID :", conversationID );
    console.log("Calling API"); 
  
    const response = await apiCall(2, 'api/message', 
      'POST', 
      JSON.stringify (
    { 
        "fullConversation": [{"id":1,"role":"user","content":"Hi","time":"****"}], 
        "mSessionToken": mSessionToken, 
        "conversation_id": conversationID,
        "requesttype": 1010 
      })
    );

    console.log("API is Called"); 
    console.log(response); 
    console.log("============================="); 

    if (response.S == 200) {  // Successfull Response 
      setMessageArray(prevArray => [
        ...prevArray,
        {
          id: prevArray.length + 1,
          role: "assistant",
          content: response.response,
          time: "xxxx"
        }
      ]);
  
  
      setConversationID(response.conversationID);
  
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log(messageArray);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
  
      setIsMessageDisabled(false);
  

    } else if (response.S == 400) {  // Payload issue
        if (response.statusCode == 400 || response.statusCode == 310) { //session is expired or conversationId issue
          handleLogout(setmSessionToken); 
        } else if (response.statusCode == 500 || response.statusCode == 510) { //Either no credit or no wallet 
          showToastMessage('error', t("appmessages.notenoughcredit.header"), t("appmessages.notenoughcredit.message"));   
        }
    }

}

  
  const handleSendMessage = async () => {
/*
    Keyboard.dismiss();
    await new Promise(resolve => setTimeout(resolve, 100)); 
*/
//   showToastMessage('info', "Test header", "Test message");         
    

    setIsMessageDisabled(true);
    setNewMessage("");
    console.log("----");
    console.log(myMessage);
  
    console.log("array - 1: ", messageArray )
    console.log("messageArray length (1): ", messageArray.length);


    // Get the current length of the message array for unique IDs
    //let currentID = messageArray.length > 0 ? messageArray[messageArray.length - 1].id + 1 : 1;

    let currentID = messageArray.length;
    console.log("xxxxxx 1: ", currentID);


    const userMessage = {
      id: messageArray.length + 1,
      role: "user",
      content: myMessage,
      time: "xxxx"
    };

    const updatedMessages = [...messageArray, userMessage];

    setMessageArray(updatedMessages);
//    setNewMessage("");


    console.log("00000000000000000000000000000000000000");
    console.log(messageArray);
    console.log("00000000000000000000000000000000000000");

    const response = await apiCall(2, 'api/message', 
      'POST', 
      JSON.stringify (
     { 
        "fullConversation": updatedMessages, 
        "mSessionToken": mSessionToken, 
        "conversation_id": conversationID,
        "requesttype": 1010 
      })
    );
  console.log("Returned response:", response);

  if (response.S == 200) {  // Successfull Response 
      const assistantMessage = {
        id: updatedMessages.length + 1,
        role: "assistant",
        content: response.response,
        time: "xxxx"
      };

      setMessageArray(prev => [...prev, assistantMessage]);
      setIsMessageDisabled(false);
      if (response.statusCode == 200) { // Conversation is finished succesfully 
        showToastMessage('error', t("appmessages.ordertaken.header"), t("appmessages.ordertaken.message"));   
      }

    } else if (response.S == 400) {  // Payload issue
      console.log(response.S, "****", response.statusCode);
        if (response.statusCode == 400 || response.statusCode == 310) { //session is expired or conversationId issue
          handleLogout(setmSessionToken); 
        } else if (response.statusCode == 500 || response.statusCode == 510) { //Either no credit or no wallet 
          showToastMessage('error', t("appmessages.notenoughcredit.header"), t("appmessages.notenoughcredit.message"));   
        }
    }
  };


  const renderMessage = ({item}: {item: ItemData}) => {
    if (item.role=="assistant") {
//      console.log("111111")
      return (
        <View style={globalStyles.chatPage.chatComm.bottextcontainer}> 
          <View style={globalStyles.chatPage.chatComm.bottextview}> 
            <Text style={globalStyles.chatPage.chatComm.bottext}>{item.content}</Text>
          </View>
        </View>
      );
    }
//    console.log("---22222222---")
    return (
      <View style={globalStyles.chatPage.chatComm.usertextcontainer}> 
        <View style={globalStyles.chatPage.chatComm.usertextview}>
          <Text style={globalStyles.chatPage.chatComm.usertext}>{item.content}</Text>
        </View>
      </View>
    );

  };



   return (

    
    <SafeAreaView  style={globalStyles.chatPage.safeareviewcontainer} edges={Platform.OS === 'ios' ? ['top', 'bottom'] : ['top']}>

      <KeyboardAvoidingView 
        style={globalStyles.chatPage.content}   
//        behavior="padding"
//        keyboardVerticalOffset={Platform.OS === 'ios' ? -20 : -30}

//        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//        keyboardVerticalOffset={100}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} // Adjust for Android

      >
      <View style={globalStyles.chatPage.chatComm.bottextcontainer}> 
          <View style={globalStyles.chatPage.chatComm.bottextview}>
            <Text style={globalStyles.chatPage.chatComm.bottext}>{t("screens.index.assistantfirstmessage")}</Text>
          </View>
      </View>

{/*  
          <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}> 
            This is the message header
      </Text>
*/}
      <FlatList
          data={messageArray}
          ref={flatListRef}
          renderItem={renderMessage}
          ListFooterComponent={<View style={{ padding: 0 }} />}
          keyExtractor={item => item.id.toString()}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
  </KeyboardAvoidingView>
  {/* 
      <View style={globalStyles.chatPage.bottomframe.toastcontent}>
          <View style={globalStyles.profilePage.toastcontainer}>
                  <Toast />
            </View> 
      </View>
  */}
      <View style={globalStyles.chatPage.bottomframe.content}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput 
            style={globalStyles.chatPage.bottomframe.bottomframetextbox} 
            value={myMessage} 
            onChangeText={setNewMessage}
            onSubmitEditing={Keyboard.dismiss}
            placeholder={t("screens.index.textplaceholder")}
            multiline={true}
          />
   
          {  !isMesageDisabled && myMessage.length>0 ? (
              <TouchableOpacity style={globalStyles.chatPage.bottomframe.bottomframesendbutton}
                disabled = {isMesageDisabled}
                onPress={handleSendMessage} >  
                <Ionicons name="send-outline" 
                  style={[ globalStyles.chatPage.bottomframe.bottomframesendbuttontext]} >  
                </Ionicons>
              </TouchableOpacity>
              )
              : (
                <TouchableOpacity style={globalStyles.chatPage.bottomframe.bottomframesendbuttondisabled}> 
                <Ionicons name="send-outline" 
                  style={[globalStyles.chatPage.bottomframe.bottomframesendbuttontext]} >  
                </Ionicons>
              </TouchableOpacity>
            )
          }
          <TouchableOpacity style={globalStyles.chatPage.bottomframe.bottomframesendbutton}
            onPress={startNewConversation} > 
            <Ionicons name="add-circle-outline" 
              style={globalStyles.chatPage.bottomframe.bottomframesendbuttontext}>  
            </Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );
}
