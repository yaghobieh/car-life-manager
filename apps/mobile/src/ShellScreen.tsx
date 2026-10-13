import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addHome, addVehicle, readJson } from './api';
import { ChipBar } from './helpers/ChipBar';
import {
  CAR_SECTIONS,
  COPY_ADD_PLATE,
  COPY_CAR,
  COPY_CITY,
  COPY_EMPTY,
  COPY_HOME,
  COPY_LOAD_FAILED_GENERIC,
  COPY_NEED_CITY,
  COPY_NEED_PLATE,
  COPY_NEED_VEHICLE,
  COPY_PLATE,
  COPY_SAVE_HOME,
  COPY_SEARCH,
  COPY_SEARCH_PLACEHOLDER,
  COPY_SENDING,
  COPY_SIGN_OUT,
  EMPTY_STRING,
  HOME_SECTIONS,
  KIND_NOTE,
  KIND_PLATE,
  KIND_SEARCH,
  KIND_SETTINGS,
  PRODUCT_CAR,
  PRODUCT_HOME,
  SECTION_HOMES,
  SECTION_OVERVIEW,
  SECTION_VEHICLES,
  VEHICLES_PATH,
  ZERO_RELOAD,
} from './mobile.const';
import type { MobileRow, ShellScreenProps } from './mobile.types';
import { firstVehicleId, rowsIn, sectionPath } from './mobile.utils';

export function ShellScreen(props: ShellScreenProps) {
  const { token, user, product, colors, themeLabel, onTheme, onProduct, onSignOut } = props;
  const sections = product === PRODUCT_CAR ? CAR_SECTIONS : HOME_SECTIONS;
  const [sectionId, setSectionId] = useState(SECTION_OVERVIEW);
  const [rows, setRows] = useState<MobileRow[]>([]);
  const [vehicleId, setVehicleId] = useState(EMPTY_STRING);
  const [query, setQuery] = useState(EMPTY_STRING);
  const [draft, setDraft] = useState(EMPTY_STRING);
  const [error, setError] = useState(EMPTY_STRING);
  const [busy, setBusy] = useState(false);
  const [reload, setReload] = useState(ZERO_RELOAD);
  const section = sections.find((item) => item.id === sectionId) ?? sections[0];

  useEffect(() => {
    let alive = true;
    async function load() {
      setBusy(true);
      setError(EMPTY_STRING);
      try {
        let currentVehicle = vehicleId;
        if (product === PRODUCT_CAR) {
          const listed = await readJson(token, VEHICLES_PATH);
          currentVehicle = firstVehicleId(listed) || currentVehicle;
          if (alive && currentVehicle !== vehicleId) setVehicleId(currentVehicle);
          if (section.id === SECTION_VEHICLES) {
            if (alive) setRows(rowsIn(listed, section.listKey));
            return;
          }
        }
        if (section.kind === KIND_NOTE || section.kind === KIND_SETTINGS) {
          if (alive) setRows([]);
          return;
        }
        if (product === PRODUCT_CAR && !currentVehicle) {
          if (alive) setRows([]);
          return;
        }
        const path = sectionPath(product, section.id, currentVehicle, query);
        if (!path) {
          if (alive) setRows([]);
          return;
        }
        const body = await readJson(token, path);
        if (alive) setRows(rowsIn(body, section.listKey));
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : COPY_LOAD_FAILED_GENERIC);
      } finally {
        if (alive) setBusy(false);
      }
    }
    void load();
    return () => {
      alive = false;
    };
  }, [token, product, section.id, section.kind, section.listKey, query, reload, vehicleId]);

  async function savePlate() {
    if (!draft.trim()) {
      setError(COPY_NEED_PLATE);
      return;
    }
    setBusy(true);
    try {
      await addVehicle(token, draft.trim());
      setDraft(EMPTY_STRING);
      setReload((value) => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : COPY_LOAD_FAILED_GENERIC);
      setBusy(false);
    }
  }

  async function saveHome() {
    if (!draft.trim()) {
      setError(COPY_NEED_CITY);
      return;
    }
    setBusy(true);
    try {
      await addHome(token, draft.trim());
      setDraft(EMPTY_STRING);
      setReload((value) => value + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : COPY_LOAD_FAILED_GENERIC);
      setBusy(false);
    }
  }

  const who = user.name || user.email || EMPTY_STRING;
  const emptyLabel = product === PRODUCT_CAR && section.id !== SECTION_VEHICLES && !vehicleId ? COPY_NEED_VEHICLE : section.empty || COPY_EMPTY;

  return (
    <View style={styles.wrap}>
      <View style={styles.top}>
        <Text style={[styles.who, { color: colors.inkSoft }]}>{who}</Text>
        <Pressable onPress={onTheme}>
          <Text style={{ color: colors.blue, fontWeight: '700' }}>{themeLabel}</Text>
        </Pressable>
      </View>
      <ChipBar
        colors={colors}
        selectedId={product}
        onSelect={(next) => {
          onProduct(next);
          setSectionId(SECTION_OVERVIEW);
          setQuery(EMPTY_STRING);
        }}
        items={[
          { id: PRODUCT_CAR, label: COPY_CAR },
          { id: PRODUCT_HOME, label: COPY_HOME },
        ]}
      />
      <ChipBar
        colors={colors}
        selectedId={section.id}
        onSelect={setSectionId}
        items={sections.map((item) => ({ id: item.id, label: item.label }))}
      />
      <Text style={[styles.title, { color: colors.ink }]}>{section.label}</Text>
      {section.kind === KIND_PLATE ? (
        <View style={styles.form}>
          <TextInput style={[styles.input, { color: colors.ink, borderColor: colors.line, backgroundColor: colors.surface }]} placeholder={COPY_PLATE} placeholderTextColor={colors.inkSoft} value={draft} onChangeText={setDraft} />
          <Pressable style={[styles.primary, { backgroundColor: colors.blue }]} onPress={() => void savePlate()}>
            <Text style={[styles.primaryText, { color: colors.white }]}>{busy ? COPY_SENDING : COPY_ADD_PLATE}</Text>
          </Pressable>
        </View>
      ) : null}
      {section.kind === KIND_SEARCH ? (
        <View style={styles.form}>
          <TextInput style={[styles.input, { color: colors.ink, borderColor: colors.line, backgroundColor: colors.surface }]} placeholder={COPY_SEARCH_PLACEHOLDER} placeholderTextColor={colors.inkSoft} value={draft} onChangeText={setDraft} />
          <Pressable style={[styles.primary, { backgroundColor: colors.blue }]} onPress={() => setQuery(draft)}>
            <Text style={[styles.primaryText, { color: colors.white }]}>{COPY_SEARCH}</Text>
          </Pressable>
        </View>
      ) : null}
      {section.id === SECTION_HOMES ? (
        <View style={styles.form}>
          <TextInput style={[styles.input, { color: colors.ink, borderColor: colors.line, backgroundColor: colors.surface }]} placeholder={COPY_CITY} placeholderTextColor={colors.inkSoft} value={draft} onChangeText={setDraft} />
          <Pressable style={[styles.primary, { backgroundColor: colors.blue }]} onPress={() => void saveHome()}>
            <Text style={[styles.primaryText, { color: colors.white }]}>{busy ? COPY_SENDING : COPY_SAVE_HOME}</Text>
          </Pressable>
        </View>
      ) : null}
      {section.kind === KIND_NOTE || section.kind === KIND_SETTINGS ? (
        <Text style={[styles.body, { color: colors.inkSoft }]}>{section.empty}</Text>
      ) : null}
      {section.kind === KIND_SETTINGS ? (
        <Pressable onPress={onSignOut}>
          <Text style={{ color: colors.blue, fontWeight: '700' }}>{COPY_SIGN_OUT}</Text>
        </Pressable>
      ) : null}
      {error ? <Text style={{ color: colors.bad }}>{error}</Text> : null}
      <ScrollView contentContainerStyle={styles.list}>
        {rows.length === 0 && section.kind !== KIND_NOTE && section.kind !== KIND_SETTINGS ? (
          <Text style={[styles.body, { color: colors.inkSoft }]}>{emptyLabel}</Text>
        ) : null}
        {rows.map((row) => (
          <View key={row.id} style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.line }]}>
            <Text style={[styles.rowTitle, { color: colors.ink }]}>{row.title}</Text>
            {row.body ? <Text style={[styles.body, { color: colors.inkSoft }]}>{row.body}</Text> : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, gap: 8 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  who: { fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800' },
  body: { fontSize: 15, lineHeight: 22 },
  form: { gap: 8 },
  input: { borderWidth: 1, borderRadius: 12, padding: 12 },
  primary: { borderRadius: 999, padding: 12, alignItems: 'center' },
  primaryText: { fontWeight: '800' },
  list: { gap: 8, paddingBottom: 24 },
  row: { borderWidth: 1, borderRadius: 14, padding: 12, gap: 4 },
  rowTitle: { fontWeight: '800' },
});
