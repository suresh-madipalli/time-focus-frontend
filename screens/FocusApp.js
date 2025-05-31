import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const getTimeSlot = (currentHour) => {
  if (currentHour >= 5 && currentHour < 7) return 'Morning Rituals';
  if (currentHour >= 8 && currentHour < 12) return 'Deep Work';
  if (currentHour >= 13 && currentHour < 16) return 'Execution Mode';
  if (currentHour >= 16 && currentHour < 19) return 'Wrap-Up';
  if (currentHour >= 19 && currentHour < 22) return 'Learning Hour';
  return 'Wind Down';
};

const BACKEND_URL = 'https://your-railway-backend-url.up.railway.app';

export default function FocusApp({ navigation }) {
  const [timeSlot, setTimeSlot] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchVideos = async () => {
      try {
        const now = new Date();
        if (!isNaN(now)) {
          const hour = now.getHours();
          const slot = getTimeSlot(hour);
          const res = await fetch(`${BACKEND_URL}/videos/${slot}`);
          const data = await res.json();
          if (isMounted) {
            setTimeSlot(slot);
            setVideos(data || []);
          }
        } else {
          throw new Error('Invalid Date object');
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Now is the time for: {timeSlot}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.videoText}>{item}</Text>
              <TouchableOpacity>
                <Ionicons name="play-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Snap Me Out of It</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Pomodoro')}>
        <Text style={styles.navButtonText}>Go to Pomodoro</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navButtonText}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 10 },
  videoText: { fontSize: 16 },
  button: { backgroundColor: '#2563eb', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  navButton: { marginTop: 10, padding: 10, backgroundColor: '#ccc', borderRadius: 8, alignItems: 'center' },
  navButtonText: { fontSize: 14, color: '#333' }
});