import {Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const CustomDetails = ({
  mobile,
  message,
  setMobile,
  setMessage,
  sendMessage,
}) => {
  return (
    <>
      <TextInput
        style={tw`bg-gray-200 p-3 m-2 rounded-md w-90% text-gray-800 border border-gray-300`}
        placeholder="Enter mobile number"
        placeholderTextColor={'#1f2937'}
        value={mobile}
        onChangeText={text => setMobile(text)}
        keyboardType="number-pad"
      />
      <TextInput
        style={tw`bg-gray-200 p-3 m-2 rounded-md w-90% text-gray-800 border border-gray-300`}
        placeholder="Enter message"
        placeholderTextColor={'#1f2937'}
        value={message}
        onChangeText={text => setMessage(text)}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />
      <TouchableOpacity
        onPress={sendMessage}
        style={tw`bg-blue-200 p-3 m-2 rounded-md w-90%`}>
        <Text style={tw`text-gray-800 text-sm`}>Send message</Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomDetails;
