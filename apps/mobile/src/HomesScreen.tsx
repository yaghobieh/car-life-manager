import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { addHome, callApi, listHomes } from './api';
import { styles } from './HomesScreen.styles';
import {
  COPY_CITY,
  COPY_EMPTY_HOMES,
  COPY_HOMES_TITLE,
  COPY_LOAD_FAILED,
  COPY_NEED_CITY,
  COPY_REFRESH,
  COPY_SAVE_FAILED,
  COPY_SAVE_HOME,
  COPY_SENDING,
  COPY_SIGN_OUT,
  EMPTY_STRING,
} from './mobile.const';
import type { Home, HomesScreenProps } from './mobile.types';

export function HomesScreen(props: HomesScreenProps) {
  const { token, user, onSignOut } = props;
  const [homes, setHomes] = useState<Home[]>([]);
  const [city, setCity] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(EMPTY_STRING);
  const [loaded, setLoaded] = useState(false);

  async function refresh() {
    setBusy(true);
    setError(EMPTY_STRING);
    const result = await callApi(() => listHomes(token), COPY_LOAD_FAILED);
    if (result.data) {
      setHomes(result.data.homes);
      setLoaded(true);
    } else {
      setError(result.error ?? COPY_LOAD_FAILED);
    }
    setBusy(false);
  }

  async function saveHome() {
    const trimmed = city.trim();
    if (!trimmed) {
      setError(COPY_NEED_CITY);
      return;
    }
    setBusy(true);
    setError(EMPTY_STRING);
    const result = await callApi(() => addHome(token, trimmed), COPY_SAVE_FAILED);
    if (result.data) {
      setCity(EMPTY_STRING);
      await refresh();
    } else {
      setError(result.error ?? COPY_SAVE_FAILED);
      setBusy(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{COPY_HOMES_TITLE}</Text>
      <Text style={styles.body}>{user.name || user.email || EMPTY_STRING}</Text>
      <TextInput style={styles.input} placeholder={COPY_CITY} value={city} onChangeText={setCity} />
      <Pressable style={styles.primary} disabled={busy} onPress={() => void saveHome()}>
        <Text style={styles.primaryText}>{busy ? COPY_SENDING : COPY_SAVE_HOME}</Text>
      </Pressable>
      <Pressable onPress={() => void refresh()}>
        <Text style={styles.link}>{COPY_REFRESH}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={homes}
        keyExtractor={(home) => home.id}
        ListEmptyComponent={<Text style={styles.body}>{loaded ? COPY_EMPTY_HOMES : EMPTY_STRING}</Text>}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>{item.city}</Text>
            <Text style={styles.body}>{item.street || item.dealType}</Text>
          </View>
        )}
      />
      <Pressable onPress={onSignOut}>
        <Text style={styles.link}>{COPY_SIGN_OUT}</Text>
      </Pressable>
    </View>
  );
}
