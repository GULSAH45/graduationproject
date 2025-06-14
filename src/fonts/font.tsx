import { useFonts, Inter_400Regular, Inter_700Bold,} from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

// ...existing imports...

export function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    // ...existing code...
  );
}