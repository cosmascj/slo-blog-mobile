import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Octicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Text } from './Text';
import { pallets } from '@/constants';

const CELL_COUNT = 6;

const TextOTP = ({ otp, setOtp }) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    const valueArray = value.split('');
    if (valueArray.length == 6) {
      setOtp(value);
    }
  }, [value]);

  return (
    <SafeAreaView>
      <View className="w-[280px] h-[52px] justify-center items-center  space-x-8 flex flex-row border-solid  mx-auto">
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          keyboardType="email-address"
          textContentType="oneTimeCode"
          rootStyle={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
          }}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={{
                fontSize: 10,
                display: 'flex',
                backgroundColor: 'white',
                borderWidth: isFocused ? 1 : 0,
                borderColor: pallets.primaryBlue,
                borderRadius: 8,
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
              }}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol ||
                (isFocused ? (
                  <Cursor />
                ) : (
                  <>
                    <View style={{ marginTop: 0 }} />
                    <Octicons name="dash" size={30} color="gray" />
                  </>
                ))}
            </Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    width: 80,
    height: 80,
  },
  focusCell: {
    borderWidth: 1,
    borderWidthStyle: 'solid',
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  container: {
    position: 'relative',
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
  },
});
export default TextOTP;
