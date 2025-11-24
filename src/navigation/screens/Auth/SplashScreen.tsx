import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/stores/useAuthStore';

const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const { accessToken } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            // Simulate a brief delay or perform other initialization if needed
            // For now, just check the token immediately
            if (accessToken) {
                navigation.replace('HomeTabs');
            } else {
                navigation.replace('LogScreen');
            }
        };

        checkAuth();
    }, [accessToken, navigation]);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default SplashScreen;
