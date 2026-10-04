import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { callApi, login, register } from './api';
import { AuthFields } from './helpers/AuthFields';
import { styles } from './LoginScreen.styled';
import {
  AUTH_MODE_LOGIN,
  AUTH_MODE_REGISTER,
  COPY_AUTH_FAILED,
  COPY_BACK,
  COPY_HAVE_ACCOUNT,
  COPY_LOGIN,
  COPY_LOGIN_BODY,
  COPY_LOGIN_TITLE,
  COPY_NEW_ACCOUNT,
  COPY_NO_TOKEN,
  COPY_PASSWORD,
  COPY_REGISTER,
  COPY_REGISTER_TITLE,
  COPY_SENDING,
  EMPTY_STRING,
} from './mobile.const';
import type { LoginScreenProps } from './mobile.types';

export function LoginScreen(props: LoginScreenProps) {
  const { colors, onSignedIn, onBack } = props;
  const [mode, setMode] = useState(AUTH_MODE_LOGIN);
  const [identifier, setIdentifier] = useState(EMPTY_STRING);
  const [email, setEmail] = useState(EMPTY_STRING);
  const [username, setUsername] = useState(EMPTY_STRING);
  const [name, setName] = useState(EMPTY_STRING);
  const [password, setPassword] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);
  const isRegister = mode === AUTH_MODE_REGISTER;

  async function submit() {
    setBusy(true);
    setError(EMPTY_STRING);

    const apiFn = isRegister
      ? () => register(email.trim(), password, name.trim(), username.trim())
      : () => login(identifier.trim(), password);

    const result = await callApi(apiFn, COPY_AUTH_FAILED);
    if (!result.data) {
      setError(result.error ?? COPY_AUTH_FAILED);
      setBusy(false);
      return;
    }

    if (!result.data.token) {
      setError(COPY_NO_TOKEN);
      setBusy(false);
      return;
    }

    onSignedIn(result.data);
    setBusy(false);
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <Text style={[styles.title, { color: colors.ink }]}>
        {isRegister ? COPY_REGISTER_TITLE : COPY_LOGIN_TITLE}
      </Text>
      <Text style={[styles.body, { color: colors.inkSoft }]}>{COPY_LOGIN_BODY}</Text>
      <AuthFields
        isRegister={isRegister}
        name={name}
        username={username}
        email={email}
        onName={setName}
        onUsername={setUsername}
        onEmail={setEmail}
        identifier={identifier}
        onIdentifier={setIdentifier}
      />
      <TextInput
        style={styles.input}
        placeholder={COPY_PASSWORD}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        style={[styles.primary, { backgroundColor: colors.blue }]}
        disabled={busy}
        onPress={() => void submit()}
      >
        <Text style={styles.primaryText}>
          {busy ? COPY_SENDING : isRegister ? COPY_REGISTER : COPY_LOGIN}
        </Text>
      </Pressable>
      <Pressable onPress={() => setMode(isRegister ? AUTH_MODE_LOGIN : AUTH_MODE_REGISTER)}>
        <Text style={[styles.link, { color: colors.blue }]}>
          {isRegister ? COPY_HAVE_ACCOUNT : COPY_NEW_ACCOUNT}
        </Text>
      </Pressable>
      <Pressable onPress={onBack}>
        <Text style={[styles.link, { color: colors.inkSoft }]}>{COPY_BACK}</Text>
      </Pressable>
    </View>
  );
}
