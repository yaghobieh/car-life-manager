import { StyleSheet, TextInput, View } from 'react-native';
import { COLOR_LINE, COLOR_SURFACE, COPY_EMAIL, COPY_NAME, COPY_USERNAME } from '../mobile.const';
import type { RegisterFieldsProps } from '../mobile.types';

export function RegisterFields(props: RegisterFieldsProps) {
  const { name, username, email, onName, onUsername, onEmail } = props;
  return (
    <View style={styles.stack}>
      <TextInput style={styles.input} placeholder={COPY_NAME} value={name} onChangeText={onName} />
      <TextInput style={styles.input} placeholder={COPY_USERNAME} autoCapitalize="none" value={username} onChangeText={onUsername} />
      <TextInput style={styles.input} placeholder={COPY_EMAIL} autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={onEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: 12 },
  input: { backgroundColor: COLOR_SURFACE, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: COLOR_LINE },
});
