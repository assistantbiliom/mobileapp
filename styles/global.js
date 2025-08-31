import { ImageBackground, StyleSheet } from "react-native";


const BRANDCOLOR_INPUTDATA  =  "#dcf8c6";
const BRANDCOLOR_BORDERICON = "#075e54" ;
//const BRANDCOLOR_BORDERICON = "#128c7e" ;

const BRANDCOLOR_BORDERINPUT = "#ccc" ;
const BRANDCOLOR_DISABLED   =  "#f2f2f2";


const BRANDCOLOR_POSITIVE   = "#128c7e";
// const BRANDCOLOR_POSITIVE   = "#669bfa";
const BRANDCOLOR_POSITIVE_TEXT   = "#ffffff";
const BRANDCOLOR_NEGATIVE   = "#fc4338";
const BRANDCOLOR_NEGATIVE_TEXT   = "#ffffff";

const BRANDCOLOR_STDTEXTBCK = "#ffffff";
const BRANDCOLOR_STDTEXT    = "#000000";

const BRANDCOLOR_ACTIONBUTTON ="#25d366";
const BRANDCOLOR_ACTIONBUTTONTEXT =  "#ffffff";

const PROFILE_ROW_HEIGHT =30; 



/*
const CELL_SIZE = 55;
const CELL_BORDER_RADIUS = 10;
// const DEFAULT_CELL_BG_COLOR = '#fff';
const DEFAULT_CELL_BG_COLOR = '#ff0000';

//const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
const NOT_EMPTY_CELL_BG_COLOR = '#00ff00';

//const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const ACTIVE_CELL_BG_COLOR = '#0000ff';
*/

export const globalStyles = StyleSheet.create({
    headerImage: {
      color: '#808080',
      bottom: -90,
      left: -35,
      position: 'absolute',
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 8,
      color: '#333',
      fontSize : 20,
    },
    myPageHeader: {
        color: '#00ff00',
        fontSize: 18,
    },
    myPageText: {
        color: '#00ffff',
        fontSize: 14,
    },
    loginPage: {
      maincontainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
      },
      welcometext : {
        textAlign: 'center',
        fontSize: 25,
        color: "#128c7e",
//        fontWeight: 'bold',
        padding : 20,
      }, 
      headcontainer: {
        flex: 4,
      },
      logocontainer : {
        borderWidth: 2,
        borderColor: '#075e54',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor: '#075e54',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
      },
      biliomMain : {
        textAlign: 'center',
        color: '#075e54',  
        fontSize: 50,
        fontWeight: 'bold',
//        padding : 5,
      }, 
      biliomSub : {
        textAlign: 'center',
        color: '#075e54',  
        fontSize: 15,
        fontStyle: 'italic',
//        padding : 5,
      }, 
      signintext : {
        textAlign: 'center',
        fontSize: 20,
        color: '#128c7e',
//        fontWeight: 'bold',
        padding : 20,
      }, 
      midcontainer: {
        flex: 4

      },
      socialcontainer: {
//        borderWidth: 2,
//        borderColor: '#25d366',
        padding: 10,
//        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
      },
      socialbuttonrow: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxcontainer: {
        flex: 2,
        flexDirection: 'row',
        marginBottom: 5,
      },
      checkboxlabel: {
        fontSize: 12,
        color: '#075e54',  
        margin: 8 , 
      },
      toastcontainer: {
        justifyContent: 'center',
      }
    },
    chatPage: {
      safeareviewcontainer: {
        backgroundColor: '#F8F5EA',
         flex: 1,
      },
      content: {
          flex: 1,
          justifyContent: 'center',
//          backgroundColor: '#F8F5EA',
          backgroundColor: '#F8F5EA',
//          margin: 30,
          padding: 20,
          width: '100%',
          bottom: 40,
//          alignItems: 'center',
      },
      bottomframe: {
        content: {
          padding: 10,
          backgroundColor: '#F8F5EA',
          alignItems: 'center',
          elevation: 3,
          bottom: 40,
        },
        bottomframetextbox: {
          flex: 1,
          borderWidth: 1,
          borderColor: '#25d366',
          borderRadius: 5,
          paddingHorizontal: 10,
          minHeight: 40,
          backgroundColor: '#fff',
          paddingTop: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,      
        },
        bottomframesendbutton: {
          backgroundColor: '#25d366',
          borderRadius: 5,
          padding: 10,
          marginLeft: 10,
          alignSelf: 'flex-end',
        },
        bottomframesendbuttondisabled: {
          backgroundColor: '#b4d6d3',
          borderRadius: 5,
          padding: 10,
          marginLeft: 10,
          alignSelf: 'flex-end',
        },
        bottomframesendbuttontext: {
          color: 'white',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',      
        },
      },
      chatComm: {
        usertextcontainer: {
          padding: 5,
          alignItems: 'flex-end', 
        },
        usertextview: {
          borderWidth: 1,
          borderColor: '#25d366',
          backgroundColor: "#dcf8c6",
          padding: 10,
          width: '60%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        },
        bottextcontainer: {
          padding: 5,
          alignItems: 'flex-start', 
        },
        bottextview: {
          borderWidth: 0.3,
          padding: 10,
          backgroundColor: "#ffffff",
          width: '60%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,              
        },
        usertext: {
          color: '#000080',
          fontSize: 12,
        }, 
        usertexttime: {
          color: '#000080',
          fontSize: 12,
        }, 
        bottext: {
          color: '#000000',
          fontSize : 12,
        },
        bottexttime: {
          color: '#000080',
          fontSize : 12,
        },
      }
    },
    ordersPage : {
      datacontainer: {
        flex: 1, 
        width: "100%",
        backgroundColor: '#F8F5EA',
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        padding: 10,
      },
      rowcontentcontainer: { 
        width: "100%",
        gap: 10,
        alignItems: 'center',        
        justifyContent: 'space-between',
        flexDirection: 'row', 
        paddingVertical: 5, // for vertical breathing room
      },
      rowcontentstatusreadonly : {
        height: PROFILE_ROW_HEIGHT*2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
        backgroundColor: "#f2f2f2",
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',    
        },
      rowcontentstatus : {
        height: PROFILE_ROW_HEIGHT*2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRANDCOLOR_ACTIONBUTTON,
        backgroundColor: BRANDCOLOR_STDTEXTBCK,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',    
       },
       rowcontentstatuscontentreadonly: {
          color: '#888', // Dimmed text color
          fontSize: 20,
        },
        rowcontentstatuscontent: {
          color : BRANDCOLOR_ACTIONBUTTON,
          fontSize: 20,
        },

        rowcontenttimerestcontainerreadonly : {
          height: PROFILE_ROW_HEIGHT*2,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: BRANDCOLOR_BORDERINPUT,
          backgroundColor: "#f2f2f2",
          flex: 2,
          justifyContent: 'center', 
          padding : 5,
         },
        rowcontenttimerestcontainer : {
          height: PROFILE_ROW_HEIGHT*2,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: BRANDCOLOR_BORDERINPUT,
          backgroundColor: BRANDCOLOR_STDTEXTBCK,
          flex: 2,
          justifyContent: 'center', 
        },

        rowcontenttimerestcontainercontent: {
          color : BRANDCOLOR_STDTEXT,
          fontSize: 12,
        },
        rowcontenttimerestcontainercontentreadonly: {
          color: '#888', // Dimmed text color
          fontSize: 12,
        },
          
        rowcontentpersoncontainer : {
          height: PROFILE_ROW_HEIGHT*2,
          borderWidth: 1,
          borderColor: BRANDCOLOR_ACTIONBUTTON,
  //        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
          backgroundColor: BRANDCOLOR_STDTEXTBCK,
          borderRadius: 10,
          flexDirection: 'row', 
          flex: 1,
          justifyContent: 'center', 
          alignItems: 'center',    
        },
        rowcontentpersoncontainerreadonly : {
          height: PROFILE_ROW_HEIGHT*2,
          borderWidth: 1,
          borderColor: BRANDCOLOR_BORDERINPUT,
          backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
          borderRadius: 10,
          flexDirection: 'row', 
          flex: 1,
          justifyContent: 'center', 
          alignItems: 'center',    
        },
        rowcontentperson: {
          color: BRANDCOLOR_STDTEXT,
          fontSize: 12,
        },
        rowcontentpersonreadonly: {
          color: '#888', // Dimmed text color
          fontSize: 12,
        },
        rowcontentpersoniconreadonly: {
          color: '#888', // Dimmed text color
          fontSize: 18,
        },
        rowcontentpersonicon: {
          color : BRANDCOLOR_STDTEXT,
          fontSize: 18,
        },
                  
                
        rowcontentactioncontainerreadonly : {
          height: PROFILE_ROW_HEIGHT*2,
          borderWidth: 1,
          borderColor: BRANDCOLOR_BORDERINPUT,
          backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
  //        backgroundColor: BRANDCOLOR_STDTEXTBCK,
          borderRadius: 10,
          flexDirection: 'row', 
          flex: 2,
          justifyContent: 'center', 
          alignItems: 'center',    
        },
        rowcontentactionreadonly: {
          color: '#888', // Dimmed text color
//          color : BRANDCOLOR_STDTEXT,
          fontSize: 10,
          textAlign: 'center',
          textAlignVertical : 'center',
        },
        rowcontentactioncontainer : {
          height: PROFILE_ROW_HEIGHT*2,
          borderWidth: 1,
          borderColor: BRANDCOLOR_BORDERINPUT,
          backgroundColor: BRANDCOLOR_ACTIONBUTTON, 
          borderRadius: 10,
          flexDirection: 'row', 
          flex: 2,
          justifyContent: 'center', 
          alignItems: 'center',    
        },
        rowcontentaction: {
          color: BRANDCOLOR_ACTIONBUTTONTEXT, 
          fontWeight : 'bold',
          fontSize: 10,
          textAlign: 'center',
          textAlignVertical : 'center',
        },
                              


      rowcontenttextboxcontainer : {
        height: PROFILE_ROW_HEIGHT*2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRANDCOLOR_ACTIONBUTTON,
        backgroundColor: BRANDCOLOR_STDTEXTBCK,
        flex: 2,
        justifyContent: 'center', 
        padding : 5,
      },
      rowcontenttextboxcontainerreadonly : {
        height: PROFILE_ROW_HEIGHT*2,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
        backgroundColor: BRANDCOLOR_STDTEXTBCK,
        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
        flex: 2,
        justifyContent: 'center', 
      },
        
/*

      rowcontenttextbox: {
//        flex:5,
//        paddingHorizontal: 10,
//        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
//        color: '#888', // Dimmed text color
        color : BRANDCOLOR_STDTEXT,
        fontSize: 12,
      },
      rowcontenttextboxreadonly: {
//        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
        color: '#888', // Dimmed text color
//        color : BRANDCOLOR_STDTEXT,
        fontSize: 12,
      },

      rowcontentperson: {
//        height: PROFILE_ROW_HEIGHT*2,
//        paddingHorizontal: 10,
//        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
//        color: '#888', // Dimmed text color
        color: BRANDCOLOR_STDTEXT,
        fontSize: 12,
      },
      rowcontentpersonicon: {
//        color: '#888', // Dimmed text color
        color : BRANDCOLOR_STDTEXT,
        fontSize: 18,
      },
      rowcontentarchivedorder: {
//        color: '#888', // Dimmed text color
        color : BRANDCOLOR_STDTEXT,
        fontSize: 20,
      },
      rowcontentstatuscontainer : {
        height: PROFILE_ROW_HEIGHT*2,
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
        backgroundColor: BRANDCOLOR_STDTEXTBCK,
//        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
        borderRadius: 10,
        flexDirection: 'row', 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',    
      },
      rowcontentactioncontainer : {
        height: PROFILE_ROW_HEIGHT*2,
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
//        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
//        backgroundColor: BRANDCOLOR_STDTEXTBCK,
        backgroundColor: BRANDCOLOR_ACTIONBUTTON, 
        borderRadius: 10,
        flexDirection: 'row', 
        flex: 2,
        justifyContent: 'center', 
        alignItems: 'center',    
      },
      rowcontentaction: {
//        color: '#888', // Dimmed text color
//        color : BRANDCOLOR_STDTEXT,
        color: BRANDCOLOR_ACTIONBUTTONTEXT, 
        fontWeight : 'bold',
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical : 'center',
      },
*/
    },
    profilePage: {
      maincontainer: {
        flex: 1, 
        backgroundColor: '#F8F5EA',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
      },
      photocontainer: {
        flex: 3, 
        backgroundColor: '#F8F5EA',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
      },
      photo: {
        width: 120, 
        height: 120, 
        borderRadius: 60,
        borderWidth: 10,
        borderColor: '#dcf8c6',
      },
      datacontainer: {
        flex: 7, 
        backgroundColor: '#F8F5EA',
        justifyContent: 'flex-start', 
        alignItems: 'flex-start',
        padding: 10,
      },
      rowcontainer: {
        flexDirection: 'row',
      },
      rowlabelcontainer: { 
        flex: 4,
        alignItems: 'flex-start', 
      },
      rowlabeltextbox: {
        height: PROFILE_ROW_HEIGHT,
        width: '100%',
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#dcf8c6',  
        color: '#000', 
        textAlign: 'right',
      },

      rowcontentcontainer: { 
        flex: 10,
        alignItems: 'flex-start', 
        marginBottom: 10,
      },
      rowcontenttextboxreadonly: {
        width: '100%',
        height: PROFILE_ROW_HEIGHT,
        borderWidth: 1,
        borderColor: BRANDCOLOR_BORDERINPUT,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2', // Light gray to indicate it's disabled
        color: '#888', // Dimmed text color
      },
      rowcontenttextboxeditable: {
        width: '100%',
        height: PROFILE_ROW_HEIGHT,
        borderWidth: 1,
        borderColor: '#dcf8c6',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',  
        color: '#000000',  
      },

      phoneinput: {
        container : {
          height : PROFILE_ROW_HEIGHT,
          alignItems: 'flex-start', 
          borderColor: BRANDCOLOR_BORDERINPUT,
          },
        flagContainer : {
//        width: "20%",
//        height : 10,
          borderColor : BRANDCOLOR_BORDERINPUT,
          fontSize : 12,
          color: BRANDCOLOR_STDTEXT,
          backgroundColor: BRANDCOLOR_STDTEXTBCK,
        },
        flag: {
        },
        caret: {
          color: BRANDCOLOR_STDTEXT,
          fontSize: 12,
        },    
        divider: {
         backgroundColor: BRANDCOLOR_BORDERINPUT,
        },
        callingCode: {
          fontSize: 12,
//          fontWeight: 'bold',
          color: BRANDCOLOR_STDTEXT,
        },
        input: {
          fontSize: 12,
          color: BRANDCOLOR_STDTEXT,
        },
      }, 
      languagecontent: { 
        minHeight: 30,
        borderColor: BRANDCOLOR_BORDERINPUT,
        fontSize: 12,
        color: BRANDCOLOR_STDTEXT,
        backgroundColor: BRANDCOLOR_STDTEXTBCK,
      },
      languageselecteditemcontainer : {
        backgroundColor : BRANDCOLOR_POSITIVE,
      },
      languageselecteditemlabel : {
        color: BRANDCOLOR_POSITIVE_TEXT,
        fontSize : 12,
        fontWeight : "bold",
      },

      rowupdatebutton:{ 
        width: '95%',
        flexDirection: 'row', 
        justifyContent: 'flex-end'
      },
      rowupdatebuttoncontainer: { 
        flex: 2,
        alignItems: 'flex-start', 
        flexDirection: 'row',
      },
      rowupdatebuttonpositive: {
        backgroundColor: BRANDCOLOR_POSITIVE,
        color : BRANDCOLOR_POSITIVE_TEXT,
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        alignSelf: 'flex-end',
      },
      rowupdatebuttonred: {
        backgroundColor: BRANDCOLOR_NEGATIVE,
        color: BRANDCOLOR_NEGATIVE_TEXT,
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
        alignSelf: 'flex-end',
      },
      rowupdatebuttontext: {
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',      
      },
      toastcontainer: {
        flex: 3,
        bottom: 40,
        justifyContent: 'bottom',
      },
      codeverificationmodalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      codeverificationmodalContent: {
        width: '90%',
        height: '50%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor : BRANDCOLOR_BORDERICON,
        borderWidth: 1,
        alignItems: 'center',
      },
      codeverificationmodalFieldRow: {
        marginTop: 20,
        flexDirection: 'row',
        marginLeft: 8,
      },
      codeverificationmodalCell: {
        width: 40,
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: '#eee',
      },
      codeverificationmodalFocusCell: {
        borderColor: '#000',
        backgroundColor: BRANDCOLOR_INPUTDATA,
      },
      codeverificationmodaltoggle: {
        width: 40,
        height: 40,
        lineHeight: 40,
        fontSize: 18,
        textAlign: 'center',
      },
      codeverificationmodaltitle: {
        paddingTop: 20,
        color: BRANDCOLOR_BORDERICON,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 40,
      },
      icon: {
        width: 217 / 3,
        height: 158 / 3,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      subTitle: {
        paddingTop: 20,
        color: BRANDCOLOR_STDTEXT,
        textAlign: 'center',
        fontSize: 14,
      },
      buttonContainer : {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        gap : 10,
//        justifyContent: 'flex-between',
      },
      verifyButton: {
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        backgroundColor: BRANDCOLOR_POSITIVE,
        borderColor: BRANDCOLOR_BORDERICON,
        borderWidth: 1,
        justifyContent: 'center',
        minWidth: 100,
        marginBottom: 50,
      },
      verifyButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
      },
      cancelButton: {
        marginTop: 20,
        borderRadius: 10,
        height: 40,
        backgroundColor: BRANDCOLOR_NEGATIVE,
        borderColor: BRANDCOLOR_BORDERICON,
        borderWidth: 1,
        justifyContent: 'center',
        minWidth: 100,
        marginBottom: 50,
      },
      cancelButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: '700',
      },
    }
});
  