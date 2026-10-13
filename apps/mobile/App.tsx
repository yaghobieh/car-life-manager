import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from './App.styled';
import { AppGate } from './src/helpers/AppGate';
import {
  API_BASE,
  COPY_BRAND,
  COPY_THEME_DARK,
  COPY_THEME_LIGHT,
  PRODUCT_CAR,
  THEME_DARK,
  THEME_LIGHT,
} from './src/mobile.const';
import type { AuthResponse } from './src/mobile.types';
import { paletteFor } from './src/mobile.utils';

export function App() {
  const [session, setSession] = useState<AuthResponse | null>(null);
  const [theme, setTheme] = useState(THEME_LIGHT);
  const [product, setProduct] = useState(PRODUCT_CAR);
  const [showLogin, setShowLogin] = useState(false);
  const colors = paletteFor(theme);
  const themeLabel = theme === THEME_DARK ? COPY_THEME_LIGHT : COPY_THEME_DARK;

  function openLogin(nextProduct: string) {
    if (nextProduct) setProduct(nextProduct);
    setShowLogin(Boolean(nextProduct));
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.paper }]}>
      <StatusBar style={theme === THEME_DARK ? 'light' : 'dark'} />
      <View style={[styles.banner, { backgroundColor: colors.navy }]}>
        <Text style={[styles.brand, { color: colors.white }]}>{COPY_BRAND}</Text>
        <Text style={[styles.bannerText, { color: colors.white }]}>{API_BASE}</Text>
      </View>
      <View style={styles.body}>
        <AppGate
          session={session}
          showLogin={showLogin}
          product={product}
          colors={colors}
          themeLabel={themeLabel}
          onTheme={() => setTheme(theme === THEME_DARK ? THEME_LIGHT : THEME_DARK)}
          onSignedIn={setSession}
          onSignOut={() => {
            setSession(null);
            setShowLogin(false);
          }}
          onOpenLogin={session?.token ? setProduct : openLogin}
        />
      </View>
    </SafeAreaView>
  );
}

