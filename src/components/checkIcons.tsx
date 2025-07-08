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
       
        checkedColor="rgba(33, 38, 171, 1)"
        uncheckedColor="rgba(33, 38, 171, 1)"
        size={22}
      />

    </View>
  );
};

export default CheckIcons;