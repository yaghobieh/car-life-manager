import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { listListings } from './api';
import { styles } from './LandingScreen.styled';
import {
  ActiveLandingTab,
  LANDING_TAB_APT,
  LANDING_TAB_CAR,
} from './LandingScreen.types';
import {
  COPY_BRAND,
  COPY_CAR,
  COPY_HOME,
  COPY_LOGIN,
  EMPTY_STRING,
  PRODUCT_CAR,
  PRODUCT_HOME,
} from './mobile.const';
import type { LandingScreenProps } from './mobile.types';

export function LandingScreen(props: LandingScreenProps) {
  const { colors, themeLabel, onTheme, onOpenLogin } = props;
  const [activeTab, setActiveTab] = useState<ActiveLandingTab>(LANDING_TAB_APT);
  const [searchQuery, setSearchQuery] = useState(EMPTY_STRING);
  const [apartments, setApartments] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await listListings();
        if (data.apartments) setApartments(data.apartments);
        if (data.cars) setCars(data.cars);
      } catch {
        // Fallback default
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  const filteredApts = apartments.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.city?.toLowerCase().includes(q) ||
      a.street?.toLowerCase().includes(q) ||
      a.desc?.toLowerCase().includes(q)
    );
  });

  const filteredCars = cars.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.maker?.toLowerCase().includes(q) ||
      c.model?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q) ||
      c.desc?.toLowerCase().includes(q)
    );
  });

  const fmt = (n: number) => '₪' + Number(n).toLocaleString('he-IL');

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {/* Top Bar */}
      <View style={styles.top}>
        <Text style={[styles.brand, { color: colors.ink }]}>{COPY_BRAND}</Text>
        <View style={styles.row}>
          <Pressable onPress={onTheme} style={styles.themeBtn}>
            <Text style={[styles.link, { color: colors.blue }]}>{themeLabel}</Text>
          </Pressable>
          <Pressable
            style={[styles.primary, { backgroundColor: colors.blue }]}
            onPress={() => onOpenLogin(activeTab === 'car' ? PRODUCT_CAR : PRODUCT_HOME)}
          >
            <Text style={[styles.primaryText, { color: colors.white }]}>{COPY_LOGIN}</Text>
          </Pressable>
        </View>
      </View>

      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#0B7A75' }]}>
        <Text style={[styles.heroTitle, { color: colors.white }]}>
          הבית הבא והרכב הבא
        </Text>
        <Text style={[styles.heroSub, { color: '#EAF7F6' }]}>
          כל המודעות במקום אחד, בעיצוב נייד מהיר
        </Text>

        {/* Search Bar */}
        <View style={[styles.searchBox, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.searchInput, { color: colors.ink }]}
            placeholder="חיפוש חופשי (לדוגמה: תל אביב, מאזדה...)"
            placeholderTextColor={colors.inkSoft}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.tabs}>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'apt' && { backgroundColor: '#0B7A75', borderColor: '#0B7A75' },
          ]}
          onPress={() => setActiveTab('apt')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'apt' ? colors.white : colors.ink },
            ]}
          >
            {COPY_HOME} ({apartments.length})
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.tab,
            activeTab === 'car' && { backgroundColor: '#2F4FC4', borderColor: '#2F4FC4' },
          ]}
          onPress={() => setActiveTab('car')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'car' ? colors.white : colors.ink },
            ]}
          >
            {COPY_CAR} ({cars.length})
          </Text>
        </Pressable>
      </View>

      {/* Listings List */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.blue} style={{ marginVertical: 32 }} />
      ) : activeTab === 'apt' ? (
        <View style={styles.list}>
          {filteredApts.map((apt) => (
            <View
              key={apt.id}
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.line, borderStartColor: '#0B7A75' },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.price, { color: '#0B7A75' }]}>
                  {fmt(apt.price)}
                  {apt.deal === 'rent' ? ' / חודש' : ''}
                </Text>
                <Text style={[styles.badge, { backgroundColor: '#EAF7F6', color: '#0A6360' }]}>
                  {apt.deal === 'sale' ? 'למכירה' : 'להשכרה'}
                </Text>
              </View>
              <Text style={[styles.title, { color: colors.ink }]}>
                {apt.rooms} חדרים · {apt.street}
              </Text>
              <Text style={[styles.sub, { color: colors.inkSoft }]}>
                {apt.city} · קומה {apt.floor} מתוך {apt.floors} · {apt.size} מ״ר
              </Text>
              <Text style={[styles.desc, { color: colors.inkSoft }]} numberOfLines={2}>
                {apt.desc}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {filteredCars.map((car) => (
            <View
              key={car.id}
              style={[
                styles.card,
                { backgroundColor: colors.surface, borderColor: colors.line, borderStartColor: '#2F4FC4' },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.price, { color: '#2F4FC4' }]}>{fmt(car.price)}</Text>
                <Text style={[styles.badge, { backgroundColor: '#EEF2FE', color: '#1F347F' }]}>
                  {car.fuel}
                </Text>
              </View>
              <Text style={[styles.title, { color: colors.ink }]}>
                {car.maker} {car.model} ({car.year})
              </Text>
              <Text style={[styles.sub, { color: colors.inkSoft }]}>
                {car.city} · {Number(car.km).toLocaleString('he-IL')} ק״מ · יד {car.hand} · {car.gear}
              </Text>
              <Text style={[styles.desc, { color: colors.inkSoft }]} numberOfLines={2}>
                {car.desc}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer Info */}
      <View style={[styles.footer, { backgroundColor: '#093A39' }]}>
        <Text style={[styles.footerTitle, { color: '#FFFFFF' }]}>HomeLife Mobile</Text>
        <Text style={[styles.footerText, { color: '#9ADAD6' }]}>
          רכבים ודירות — נתונים חיים ומסונכרנים עם השרת המרכזי
        </Text>
      </View>
    </ScrollView>
  );
}

