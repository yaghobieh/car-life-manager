import { StyleSheet } from 'react-native';
import {
  COLOR_BAD,
  COLOR_BLUE,
  COLOR_INK,
  COLOR_INK_SOFT,
  COLOR_LINE,
  COLOR_NAVY,
  COLOR_SURFACE,
  COLOR_WHITE,
} from './mobile.const';

export const styles = StyleSheet.create({
  wrap: { flex: 1, gap: 12 },
  title: { fontSize: 28, fontWeight: '800', color: COLOR_INK },
  body: { color: COLOR_INK_SOFT },
  input: { backgroundColor: COLOR_SURFACE, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: COLOR_LINE },
  primary: { backgroundColor: COLOR_BLUE, borderRadius: 999, padding: 14, alignItems: 'center' },
  primaryText: { color: COLOR_WHITE, fontWeight: '800' },
  link: { color: COLOR_NAVY, fontWeight: '700' },
  error: { color: COLOR_BAD },
  row: { backgroundColor: COLOR_SURFACE, borderRadius: 16, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLOR_LINE },
  rowTitle: { fontWeight: '800', color: COLOR_INK },
});
