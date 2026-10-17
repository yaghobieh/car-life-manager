import { StyleSheet, TextInput } from 'react-native';
import { COLOR_LINE, COLOR_SURFACE, COPY_IDENTIFIER } from '../mobile.const';
import type { LoginFieldsProps } from '../mobile.types';

export function LoginFields(props: LoginFieldsProps) {
  const { identifier, onIdentifier } = props;
  return (
    <TextInput
      style={styles.input}
      placeholder={COPY_IDENTIFIER}
      autoCapitalize="none"
      value={identifier}
      onChangeText={onIdentifier}
    />
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: COLOR_SURFACE, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: COLOR_LINE },
});
