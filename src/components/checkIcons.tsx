import { View } from 'react-native';
import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';

const CheckIcons = () => {
  const [checked, setChecked] = useState(false);

  return (
    <View>
      <CheckBox
     checked={checked}
        onPress={() => setChecked(!checked)}
      />

    </View>
  );
};

export default CheckIcons;