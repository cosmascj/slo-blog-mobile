import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';


import RightIcon from '../assets/icons/arrow-right-icon.svg';

import { AntDesign } from '@expo/vector-icons';
import { Text } from '@/components';
import { pallets } from '@/constants';

interface Props {
  icon: ReactNode;
  title: string;
  badgeText?: string;
  subText?: string;
  rightComponent?: JSX.Element;
  style?: ViewStyle;
  checked?: boolean
  hasAmount?: boolean
  amount?: string
}

export const ListItem = ({
  icon,
  title,
  badgeText,
  subText,
  rightComponent,
  style, checked, hasAmount, amount
}: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[style, { alignItems: 'center', marginTop: 1 }]}>{icon}</View>
        <View style={styles.title}>
          <View style={[styles.content, { marginRight: 0, marginStart: 10 }]}>
            <Text style={{ fontSize: 16 }}>{title}</Text>
            {Boolean(badgeText) && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{badgeText}</Text>
              </View>
            )}
          </View>
          {subText && <Text style={{ color: pallets.textSecondary, marginStart: 10 }}>{subText}</Text>}
        </View>
      </View>
      {checked && (
        <AntDesign name="checkcircle" size={24} color={pallets.primaryBlue} />
      )}
      {hasAmount && (
        <Text fontWeight='600'>{amount}</Text>
      )}
      {/* {rightComponent || <RightIcon />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: pallets.textSecondary,
    borderRadius: 4,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: pallets.primaryBlue,
  },
  container: {
    marginVertical: 5,
    alignItems: 'center',
    borderColor: pallets.borderGrey,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    // flex: 1,
    flexDirection: 'row',
    marginRight: 10,
  },
  title: { marginLeft: 10, },
});

