import React from 'react';
import {Text, TextInput} from 'react-native-paper';

import {styles} from './styles.component';

const AddressForm = ({form}: any) => {
  return (
    <>
      <Text variant="titleLarge">Address:</Text>
      <TextInput
        label="Street"
        onChangeText={form.handleChange('street')}
        onBlur={form.handleBlur('street')}
        value={form.values.street}
      />
      <Text style={styles.invalidText}>
        {form.errors.street && form.touched && form.errors.street}
      </Text>
      <TextInput
        label="City"
        onChangeText={form.handleChange('city')}
        onBlur={form.handleBlur('city')}
        value={form.values.city}
      />
      <Text style={styles.invalidText}>
        {form.errors.city && form.touched && form.errors.city}
      </Text>
      <TextInput
        label="State"
        onChangeText={form.handleChange('state')}
        onBlur={form.handleBlur('state')}
        value={form.values.state}
      />
      <Text style={styles.invalidText}>
        {form.errors.state && form.touched && form.errors.state}
      </Text>
      <TextInput
        label="Postal Code"
        onChangeText={form.handleChange('postalCode')}
        onBlur={form.handleBlur('postalCode')}
        value={form.values.postalCode}
      />
      <Text style={styles.invalidText}>
        {form.errors.postalCode && form.touched && form.errors.postalCode}
      </Text>
    </>
  );
};

export default AddressForm;
