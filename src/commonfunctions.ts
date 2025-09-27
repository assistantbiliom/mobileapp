import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useSession } from './context/SessionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const APISERVER_1 = "https://1c1cda0087df.ngrok-free.app/" ;
//const APISERVER_1 = "http://localhost:6000/" ;
const APISERVER_2 = "https://c2564c6f0885.ngrok-free.app/" ;


const showToastMessage = (type, text1, text2) => {
  
    Toast.show({
      type: type, // 'success' | 'error' | 'info'
      text1: text1,
      text2: text2,
    });
  };


  const handleLogout = async (setmSessionToken) => {
    try {
      await AsyncStorage.clear(); // Remove stored token
      setmSessionToken('0'); // Set context back to logged-out
      router.replace('/'); // Redirect to root
      showToastMessage('success', 'Logged Out', 'You have been logged out successfully.');
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Logout error: ", error);
      showToastMessage('error', 'Logout Failed', 'An error occurred during logout.');
      throw error; // Optionally rethrow the error for further handling
    }
  };



const apiCall = async (urltype, uri, method = 'GET', params = null) => {

    let response; 

    console.log("XXXXXXXXX");  
    console.log("params : ", params);  
    console.log("YYYYYYYYYYYYY"); 

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        if (method === 'POST' || method === 'PUT') {
            console.log("body :", params);
            console.log("body json :", JSON.stringify(params));

//            options.body = JSON.stringify(params);             
            options.body = params;
        }

        
        if (urltype === 1) {
            console.log("######################################");
            response = await fetch((APISERVER_1+uri), options);
            console.log(response)
            console.log("######################################");

        }
        else {
            console.log("######################################");
            response = await fetch((APISERVER_2+uri), options);
            console.log(response)
            console.log("######################################");
        }

//        response = await fetch((APISERVER_1+uri), options);

        const jsonResponse = await response.json();

        if (!response.ok) {
            throw new Error(jsonResponse.message || 'Something went wrong');
        }
        console.log("-------------------------------------");
        console.log(jsonResponse); 
        console.log("-------------------------------------");
        return jsonResponse;
    } catch (error) {
//        Alert.alert('Error', error.message);
        return { "S": 500, "statusCode": 500, "statusDesc": error };
    }
};


const apiCall2 = async (urltype, uri, method = 'GET', params = null) => {

    let response; 

    console.log("ANAANANANNANANANANAN");
    console.log("ANAANANANNANANANANAN");
    console.log("ANAANANANNANANANANAN");
    console.log("ANAANANANNANANANANAN");
    console.log("ANAANANANNANANANANAN");


    fetch("https://e16405f53f2c.ngrok-free.app/api/message")
    .then(async response => {
      if (!response.ok) {
        const errorBody = await response.text(); // or .json() if JSON
        console.error('Fetch failed with status:', response.status);
        console.error('Response body:', errorBody);
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json(); // or .text()
    })
    .then(data => {
      console.log('API success:', data);
    })
    .catch(error => {
      console.error('Fetch error:', error.message);
      console.error('Full error object:', error);
    });

    return ;

    console.log("XXXXXXXXX");  
    console.log("params : ", params);  
    console.log("YYYYYYYYYYYYY"); 

    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        if (method === 'POST' || method === 'PUT') {
            console.log("body :", params);
            console.log("body json :", JSON.stringify(params));

            options.body = JSON.stringify(params);             
        }

        
        if (urltype === 1) {
            console.log("######################################");
            response = await fetch((APISERVER_1+uri), options);
            console.log(response)
            console.log("######################################");

        }
        else {
            console.log("######################################");
            let test= APISERVER_2+uri; 
            console.log(test);
            response = await fetch((APISERVER_2+uri), options);
            console.log(response)
            console.log("######################################");
        }

//        response = await fetch((APISERVER_1+uri), options);

        const jsonResponse = await response.json();

        if (!response.ok) {
            throw new Error(jsonResponse.message || 'Something went wrong');
        }
        console.log("-------------------------------------");
        console.log(jsonResponse); 
        console.log("-------------------------------------");
        return jsonResponse;
    } catch (error) {
//        Alert.alert('Error', error.message);
        return { "S": 500, "statusCode": 500, "statusDesc": error };
    }
};



export { apiCall, apiCall2, showToastMessage, handleLogout };
