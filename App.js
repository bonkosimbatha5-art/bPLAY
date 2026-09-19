import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, ImageBackground, TouchableOpacity, Dimensions, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Simple custom SVG vector icon renderer to avoid extra library dependencies on mobile builds
const NavIcon = ({ type, active }) => {
  const color = active ? '#D4AF37' : '#888888';
  if (type === 'home') return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />
    </Svg>
  );
  if (type === 'search') return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color} />
    </Svg>
  );
  if (type === 'live') return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill={color} />
    </Svg>
  );
  if (type === 'downloads') return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" fill={color} />
    </Svg>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [current, setCurrent] = useState('Kasi Anthem Vol. 3');

  // Helper render to swap screens based on which tab button is selected
  const renderContent = () => {
    if (activeTab === 'search') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Search Screen Coming Soon</Text></View>;
    if (activeTab === 'live') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Live TV Stream Coming Soon</Text></View>;
    if (activeTab === 'downloads') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fff' }}>Offline Downloads Empty</Text></View>;

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Top Hero Showcase */}
        <View style={{ padding: 16, marginTop: 40 }}>
          <Text style={{ color: '#E50914', fontWeight: 'bold', fontSize: 12 }}>● HIP-HOP</Text>
          <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 8 }}>Kasi Anthem Vol. 3</Text>
          <Text style={{ color: '#aaa', fontSize: 16, marginTop: 4 }}>DJ Maphorisa x Tyler ICU</Text>
          <Text style={{ color: '#666', fontSize: 13, marginTop: 8, lineHeight: 18 }}>The visual everyone has been waiting for. Log Drum bass meets Newcastle streets.</Text>
          <Text style={{ color: '#888', fontSize: 11, marginTop: 6 }}>892.0K views • Fresh</Text>

          <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 24, flexDirection: 'row', alignItems: 'center', marginRight: 12 }}>
              <Text style={{ color: '#000', fontWeight: '900', fontSize: 15 }}>▶ Play Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#222', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24, marginRight: 12 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>ⓘ Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 22, fontWeight: '300' }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trending Segment */}
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Trending Now <Text style={{ color: '#555', fontSize: 12, fontWeight: 'normal' }}>Top 10 this week</Text></Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
            <View style={{ width: 150, backgroundColor: '#111', borderRadius: 12, padding: 12, marginRight: 12 }}>
              <View style={{ height: 100, backgroundColor: '#222', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D4AF37', fontSize: 24 }}>▶</Text>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Piano King Sessions</Text>
              <Text style={{ color: '#666', fontSize: 11 }}>Kabza De Small</Text>
            </View>
            <View style={{ width: 150, backgroundColor: '#111', borderRadius: 12, padding: 12, marginRight: 12 }}>
              <View style={{ height: 100, backgroundColor: '#222', borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#D4AF37', fontSize: 24 }}>▶</Text>
              </View>
              <Text style={{ color: '#fff', fontWeight: 'bold', marginTop: 8, fontSize: 13 }} numberOfLines={1}>Sunset Sessions Pt. 2</Text>
              <Text style={{ color: '#666', fontSize: 11 }}>Black Coffee</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#000000' }}>
      <StatusBar style="light" />
      
      {/* Dynamic Body Content */}
      {renderContent()}

      {/* Floating Bottom Navigation Tab Dock */}
      <View style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        backgroundColor: '#0a0a0a', 
        borderTopWidth: 1, 
        borderColor: '#111', 
        height: 70, 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center',
        paddingBottom: 10
      }}>
        <TouchableOpacity onPress={() => setActiveTab('home')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <NavIcon type="home" active={activeTab === 'home'} />
          <Text style={{ color: activeTab === 'home' ? '#D4AF37' : '#888', fontSize: 10, marginTop: 4 }}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('search')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <NavIcon type="search" active={activeTab === 'search'} />
          <Text style={{ color: activeTab === 'search' ? '#D4AF37' : '#888', fontSize: 10, marginTop: 4 }}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('live')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <NavIcon type="live" active={activeTab === 'live'} />
          <Text style={{ color: activeTab === 'live' ? '#D4AF37' : '#888', fontSize: 10, marginTop: 4 }}>Live</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('downloads')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <NavIcon type="downloads" active={activeTab === 'downloads'} />
          <Text style={{ color: activeTab === 'downloads' ? '#D4AF37' : '#888', fontSize: 10, marginTop: 4 }}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
