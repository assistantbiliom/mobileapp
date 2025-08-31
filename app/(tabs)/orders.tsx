import { StyleSheet, Image, Platform, FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTranslation } from 'react-i18next'; 


import { Tabs, useLocalSearchParams } from 'expo-router';

import React, { useState, useEffect } from 'react';

import {apiCall, showToastMessage } from '../../src/commonfunctions';

import {globalStyles,
  BRANDCOLOR_INPUTDATA,
  BRANDCOLOR_BORDERICON,
  BRANDCOLOR_DISABLED,
  BRANDCOLOR_NEGATIVE
} from '../../styles/global';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  

export default function TabTwoScreen() {
    const { t } = useTranslation();
  
    const { mSessionToken } = useLocalSearchParams(); // Retrieve mSessionToken

    const [myOrders, setMyOrders] = useState('');
    

    const handleCancelOrder= async (item) => {

      console.log("Test !!!! ")
      console.log(item.orderid)

      try {
        const data = await apiCall(1, 'cancelorder', 
          'POST', 
          JSON.stringify (
            { 
              "mSessionToken": mSessionToken,
              "orderid": item.orderid
            }
          )
        );  
//        setMyOrders(data.ordersresponsearray);
        console.log("order data ... ", data);
      } catch (error) {
//         console.log("Error fetching orders :", error);
      }
      
      console.log("cccccccccccc")

    };


    const getOrders = async () => {

      try {
        const data = await apiCall(1, 'getorders', 
          'GET', 
          JSON.stringify (
            { 
              "mSessionToken": mSessionToken,
            }
          )
        );  
        setMyOrders(data.ordersresponsearray);
        console.log("Profile data:", data);
      } catch (error) {
         console.log("Error fetching orders :", error);
      }
    };
    
    
    const renderOrders = ({item}: {item: ItemData}) => {
        return (
          <View style={globalStyles.ordersPage.rowcontentcontainer}> 
           {/* Status Area*/}

             { (item.status == "Done" || item.status == "Cancelled" || item.status == "Cancelling")  && (

                <View style={globalStyles.ordersPage.rowcontentstatusreadonly}>
                  { item.status == "Done" && (
                    <MaterialCommunityIcons 
                      name="archive-clock-outline" 
                      style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                    />
                    )
                  }
                  { item.status == "Cancelled" && (
                    <MaterialCommunityIcons 
                      name="clock-remove-outline" 
                      style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                    /> 
                    )
                  }
                  { item.status == "Cancelling" && (
                    <View>
                      <MaterialIcons 
                        name="settings-phone" 
                        style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                      /> 
                    </View>
                  )
                  }
               </View>
              )
            }
            { (item.status == "Confirmed" || item.status == "Waiting")   && (
              <View style={globalStyles.ordersPage.rowcontentstatus}>
                { item.status == "Confirmed" && (
                  <View>
                    <MaterialCommunityIcons 
                      name="clock-check-outline" 
                      style={globalStyles.ordersPage.rowcontentstatuscontent}  
                    /> 
                  </View>
                )
                }
                { item.status == "Waiting" && (
                  <View>
                    <MaterialIcons 
                      name="settings-phone" 
                      style={globalStyles.ordersPage.rowcontentstatuscontent}  
                    /> 
                  </View>
                )
                }
              </View>
             )
            }
            {/* Date Time */}
            { (item.status == "Done" || item.status == "Cancelled" || item.status == "Cancelling")  && (
              <View style={globalStyles.ordersPage.rowcontenttimerestcontainerreadonly}>
                  <TextInput 
                    style={globalStyles.ordersPage.rowcontenttimerestcontainercontentreadonly} 
                    multiline={true}
                    editable={false} 
                    value={`${item.date}\n${item.time}`}
                  />  
              </View>
              )
            }
            { (item.status == "Confirmed" || item.status == "Waiting")   && (
              <View style={globalStyles.ordersPage.rowcontenttextboxcontainer}>
                  <TextInput 
                      style={globalStyles.ordersPage.rowcontenttimerestcontainercontent} 
                      multiline={true}
                      editable={false} 
                      value={`${item.date}\n${item.time}`}
                      />            
              </View>
             )
           }
          {/* Restaurant */}
            { (item.status == "Done" || item.status == "Cancelled" || item.status == "Cancelling")  && (
              <View style={globalStyles.ordersPage.rowcontenttimerestcontainerreadonly}>
                  <TextInput 
                    style={globalStyles.ordersPage.rowcontenttimerestcontainercontentreadonly} 
                    multiline={true}
                    editable={false} 
                    value={item.restaurant}
                  />  
              </View>
              )
            }
            { (item.status == "Confirmed" || item.status == "Waiting")   && (
              <View style={globalStyles.ordersPage.rowcontenttextboxcontainer}>
                  <TextInput 
                      style={globalStyles.ordersPage.rowcontenttimerestcontainercontent} 
                      multiline={true}
                      editable={false} 
                      value={item.restaurant}
                      />            
              </View>
             )
           }

          {/* #of Person */}

          { (item.status == "Done" || item.status == "Cancelled" || item.status == "Cancelling")  && (
           <View style={globalStyles.ordersPage.rowcontentpersoncontainerreadonly}>
            <TextInput 
                    style={globalStyles.ordersPage.rowcontentpersonreadonly} 
                    multiline={true}
                    editable={false} 
                    value={`${item.person} x`} 
                  />            
            <Ionicons name="person" 
                style={globalStyles.ordersPage.rowcontentpersoniconreadonly}
            />            
           </View>
           )
          }
          { (item.status == "Confirmed" || item.status == "Waiting")   && (
           <View style={globalStyles.ordersPage.rowcontentpersoncontainer}>
              <TextInput 
                      style={globalStyles.ordersPage.rowcontentperson} 
                      multiline={true}
                      editable={false} 
                      value={`${item.person} x`} 
                    />            
              <Ionicons name="person" 
                  style={globalStyles.ordersPage.rowcontentpersonicon}
              />            
            </View>
            )
          }

            {/* Action Area */}

            { (item.status == "Done" || item.status == "Cancelled" || item.status == "Cancelling")  && (
            <View style={globalStyles.ordersPage.rowcontentactioncontainerreadonly}>
              { item.status == "Done" && (
                <TextInput 
                  style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.archived")}
                />            
                )
              }
              { item.status == "Cancelled" && (
                <TextInput 
                  style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.cancelled")}
                  />            
               )
              }
              { item.status == "Cancelling" && (
                <TextInput 
                 style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.workingoncancel")}
                />
                )
              }
            </View>
              ) }

        {
         (item.status == "Confirmed" || item.status == "Waiting")   && (

          <View style={globalStyles.ordersPage.rowcontentactioncontainer}>
            {item.status === "Confirmed" && (
              <TouchableOpacity 
//                style={globalStyles.ordersPage.rowcontentaction}
                onPress={() => handleCancelReservation(item)}
              >
                <Text style={globalStyles.ordersPage.rowcontentaction}>{t("screens.orders.status.cancelreservation")}</Text>
              </TouchableOpacity>
            )}

            {item.status === "Waiting" && (
              <TouchableOpacity 
//                style={globalStyles.ordersPage.rowcontentaction}
                onPress={() => handleCancelOrder(item)}
              >
                <Text style={globalStyles.ordersPage.rowcontentaction} >{t("screens.orders.status.cancelorder")}</Text>
              </TouchableOpacity>
            )}
          </View>

            )

/*
         (item.status == "Confirmed" || item.status == "Waiting")   && (

              <View style={globalStyles.ordersPage.rowcontentactioncontainer}>             
              { item.status == "Confirmed" && (
                <TextInput  
                  style={globalStyles.ordersPage.rowcontentaction} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.cancelreservation")}
                />            
                )
              }
              { item.status == "Waiting" && (
                <TextInput 
                  style={globalStyles.ordersPage.rowcontentaction} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.cancelorder")}
                />
                )  
              }
            </View>


            )
*/
          }


          </View>
        );
    }

    useEffect(() => {
      getOrders();
    }, []);
    
    
  return (


    <View style={globalStyles.ordersPage.datacontainer}> 

{/* 
      <View style={globalStyles.ordersPage.rowcontentcontainer}> 
                  <View style={globalStyles.ordersPage.rowcontenttextboxcontainer}>
                      <TextInput 
                        style={globalStyles.ordersPage.rowcontenttextboxreadonly} 
                        multiline={true}
                        editable={false} 
                        value="Adem"
                      />
        
                  </View>
                  <View style={globalStyles.ordersPage.rowcontenttextboxcontainer}>

                    <TextInput 
                        style={globalStyles.ordersPage.rowcontenttextboxreadonly} 
                        multiline={true}
                        editable={false} 
                        value="Badem"
                      />
                  
                </View>
        </View>
*/}

      <FlatList
        style={{ width: "100%" }} 

        data={myOrders}
  //      ref={orderid}
        renderItem={renderOrders}
        ListFooterComponent={<View style={{ padding: 5 }} />}
        keyExtractor={item => item.orderid.toString()}
//        contentContainerStyle={{flex: 1 }} // 🔥 This ensures items stretch
  //      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
  //      onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
  </View>
 /*
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
*/
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
