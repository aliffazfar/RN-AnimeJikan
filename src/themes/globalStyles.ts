import {StyleSheet} from 'react-native';
import {colors} from './colors';

export default StyleSheet.create({
  containerBase: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    padding: 16,
    justifyContent: 'center',
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
