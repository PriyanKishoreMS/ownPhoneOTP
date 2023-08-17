import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import tw from 'twrnc';
import CustomDetails from '../components/CustomDetails';

const HomeScreen = () => {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');
  const sendMessage = () => {
    console.log('Sending message to ', mobile);
    console.log('Message is ', message);
    SmsAndroid.autoSend(
      mobile,
      message,
      fail => {
        console.log('Failed with this error: ', fail);
      },
      success => {
        setSent(true);
        setTimeout(() => {
          setSent(false);
        }, 3000);
        console.log('SMS sent successfully to ', mobile);
      },
    );
  };
  return (
    <SafeAreaView style={tw`bg-slate-100 h-full`}>
      <View style={tw`flex items-center justify-center mt-10`}>
        <View style={tw`bg-blue-100 p-3 shadow-lg w-full items-center`}>
          <Text style={tw`text-black text-3xl font-bold tracking-widest`}>
            OWN PHONE OTP
          </Text>
        </View>
        <Text style={tw`text-gray-600 text-sm italic mt-3 mb-10`}>
          Verify your client with your own phone
        </Text>
        <CustomDetails
          mobile={mobile}
          message={message}
          setMobile={setMobile}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {sent && (
          <View
            style={tw`bg-green-200 p-1 mt-5 items-center rounded-md px-2 shadow-md`}>
            <Text style={tw`text-green-900`}>
              Message sent successfully to {mobile}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
