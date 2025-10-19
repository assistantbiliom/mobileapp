import { StyleSheet, Image, Platform, FlatList, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTranslation } from 'react-i18next'; 
import Toast from 'react-native-toast-message';



import { Tabs, useLocalSearchParams } from 'expo-router';

import React, { useState, useEffect } from 'react';

import {apiCall, showToastMessage, handleLogout } from '../../src/commonfunctions';


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

import { useSession } from '../../src/context/SessionContext';
  

export default function TabTwoScreen() {
    const { t } = useTranslation();
  
//    const { mSessionToken } = useLocalSearchParams(); // Retrieve mSessionToken
    const { mSessionToken, setmSessionToken } = useSession();

    const [myOrders, setMyOrders] = useState('');
    

    const updateRequest= async (item, newStatus) => {

      console.log("Test !!!! ")
      console.log(item.orderid)

      try {
        const data = await apiCall(1, 'updaterequest', 
          'POST', 
          JSON.stringify (
            { 
              "mSessionToken": mSessionToken,
              "reservationid": item.reservationid,
              "newStatus": newStatus
            }
          )
        );  
//        setMyOrders(data.ordersresponsearray);
        console.log("order data ... ", data);

        if (data.S == 200) {
          setMyOrders(data.requests);
          showToastMessage('info', t("appmessages.orderupdatesuccess.header"), t("appmessages.orderupdatesuccess.message"));        

        }
        else {
          showToastMessage('error', t("appmessages.orderupdateerror.header"), t("appmessages.orderupdateerror.message"));        
        }

      } catch (error) {
        showToastMessage('error', t("appmessages.orderupdateerror.header"), t("appmessages.orderupdateerror.message"));         
        setTimeout(() => {
          handleLogout(setmSessionToken);
        }, 1000);              
        console.log("Error cancelling order :", error);
      }
      
    };


    const getOrders = async () => {

      try {
        const data = await apiCall(1, 'getrequests', 
          'POST', 
          JSON.stringify (
            { 
              "mSessionToken": mSessionToken,
            }
          )
        );  

        if (data.S == 200) {

          setMyOrders(data.requests);
        }
        else {
          showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unknownerror.message"));         
          setTimeout(() => {
            handleLogout(setmSessionToken);
            console.log("Token issues ...");
          }, 1000);              
          
        }

        console.log("Get user data:", data);

      } catch (error) {
        showToastMessage('error', t("appmessages.unknownerror.header"), t("appmessages.unknownerror.message"));         
        setTimeout(() => {
          handleLogout(setmSessionToken);
          console.log("Token issues ...");
        }, 1000);              
         console.log("Error fetching orders :", error);
      }
    };
    
    
    const renderOrders = ({item}: {item: ItemData}) => {
        return (
          <View style={globalStyles.ordersPage.rowcontentcontainer}> 
           {/* Status Area*/}

             { ( item.status == "Done" || 
                 item.status == "Cancelled" || 
                 item.status == "Cancelling" ||
                 item.status == "Processing" ||
                 item.status == "Rejected" ||
                 item.status == "System Error" 
                ) && (

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
                  { item.status == "Processing" && (
                    <View>
                      <MaterialIcons 
                        name="settings-phone" 
                        style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                      /> 
                    </View>
                  )
                  }
                  { item.status == "Rejected" && (
                    <View>
                      <MaterialIcons 
                        name="stop-circle" 
                        style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                      /> 
                    </View>
                  )
                  }
                  { item.status == "System Error" && (
                    <View>
                      <MaterialIcons 
                        name="error-outline" 
                        style={globalStyles.ordersPage.rowcontentstatuscontentreadonly}  
                      /> 
                    </View>
                  )
                  }
               </View>
              )
            }
            { (item.status == "Confirmed" || item.status == "Requested")   && (
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
                { item.status == "Requested" && (
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
            { (
              item.status == "Done" || 
              item.status == "Cancelled" || 
              item.status == "Cancelling" ||
              item.status == "Processing" ||
              item.status == "Rejected" ||
              item.status == "System Error" 
              )  && (
              <View style={globalStyles.ordersPage.rowcontenttimerestcontainerreadonly}>
                  <TextInput 
                    style={globalStyles.ordersPage.rowcontenttimerestcontainercontentreadonly} 
                    multiline={true}
                    editable={false} 
                    value={`${item.date}\n${item.time}\n(${item.duration} ${t("screens.orders.status.hour")})`}
                  />  
              </View>
              )
            }
            { (item.status == "Confirmed" || item.status == "Requested")   && (
              <View style={globalStyles.ordersPage.rowcontenttextboxcontainer}>
                  <TextInput 
                      style={globalStyles.ordersPage.rowcontenttimerestcontainercontent} 
                      multiline={true}
                      editable={false} 
                      value={`${item.date}\n${item.time}\n(${item.duration} ${t("screens.orders.status.hour")})`}
                      />            
              </View>
             )
           }
          {/* Restaurant */}
            { (item.status == "Done" || 
                 item.status == "Cancelled" || 
                 item.status == "Cancelling" ||
                 item.status == "Processing" ||
                 item.status == "Rejected" ||
                 item.status == "System Error" 
               )  && (
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
            { (item.status == "Confirmed" || item.status == "Requested")   && (
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

          { (item.status == "Done" || 
                 item.status == "Cancelled" || 
                 item.status == "Cancelling" ||
                 item.status == "Processing" ||
                 item.status == "Rejected" ||
                 item.status == "System Error" 
               )  && (
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
          { (item.status == "Confirmed" || item.status == "Requested")   && (
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

            { (item.status == "Done" || 
                 item.status == "Cancelled" || 
                 item.status == "Cancelling" ||
                 item.status == "Processing" ||
                 item.status == "Rejected" ||
                 item.status == "System Error" 
               )  && (
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
              { item.status == "Processing" && (
                <TextInput 
                 style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.processing")}
                />
                )
              }
              { item.status == "Rejected" && (
                <TextInput 
                 style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.rejected")}
                />
                )
              }
              { item.status == "System Error" && (
                <TextInput 
                 style={globalStyles.ordersPage.rowcontentactionreadonly} 
                  multiline={true}
                  editable={false} 
                  value={t("screens.orders.status.systemerror")}
                />
                )
              }

            </View>
              ) }

        {
         (item.status == "Confirmed" || item.status == "Requested")   && (

          <View style={globalStyles.ordersPage.rowcontentactioncontainer}>
            {item.status === "Confirmed" && (
              <TouchableOpacity 
//                style={globalStyles.ordersPage.rowcontentaction}
                onPress={() => updateRequest(item,4500)}
              >
                <Text style={globalStyles.ordersPage.rowcontentaction}>{t("screens.orders.status.cancelreservation")}</Text>
              </TouchableOpacity>
            )}

            {item.status === "Requested" && (
              <TouchableOpacity 
//                style={globalStyles.ordersPage.rowcontentaction}
                onPress={() => updateRequest(item,4000)}
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
        keyExtractor={item => item.reservationid.toString()}
//        contentContainerStyle={{flex: 1 }} // 🔥 This ensures items stretch
  //      onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
  //      onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
{/*       
      <View>
        <Toast />
      </View>
*/}      
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
