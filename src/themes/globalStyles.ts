import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const globalStyles = StyleSheet.create({
  containerBase: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    paddingTop: 20,
  },
  textFieldContainer: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: colors.palette.primary600,
  },
  textField: {},
});
