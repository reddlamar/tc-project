import React from 'react';
import {View} from 'react-native';
import {Text, TextInput, Avatar, Card} from 'react-native-paper';

import {styles} from './styles.component';

const LeftContent = (props: any) => (
  <Avatar.Icon {...props} icon="account-plus" />
);

const SignUpForm = ({children, form, title = ''}: any) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={`${title} Sign Up Form`}
          left={LeftContent}
          titleStyle={styles.cardTitle}
        />
        <Card.Content>
          <TextInput
            label="First Name"
            onChangeText={form.handleChange('firstName')}
            onBlur={form.handleBlur('firstName')}
            value={form.values.firstName}
            autoCapitalize="none"
          />
          <Text style={styles.invalidText}>
            {form.errors.firstName && form.touched && form.errors.firstName}
          </Text>
          <TextInput
            label="Last Name"
            onChangeText={form.handleChange('lastName')}
            onBlur={form.handleBlur('lastName')}
            value={form.values.lastName}
            autoCapitalize="none"
          />
          <Text style={styles.invalidText}>
            {form.errors.lastName && form.touched && form.errors.lastName}
          </Text>
          <TextInput
            label="Email"
            onChangeText={form.handleChange('email')}
            onBlur={form.handleBlur('email')}
            value={form.values.email}
            autoCapitalize="none"
          />
          <Text style={styles.invalidText}>
            {form.errors.email && form.touched && form.errors.email}
          </Text>
          <TextInput
            label="Password"
            onChangeText={form.handleChange('password')}
            onBlur={form.handleBlur('password')}
            value={form.values.password}
            autoCapitalize="none"
            secureTextEntry
          />
          <Text style={styles.invalidText}>
            {form.errors.password && form.touched && form.errors.password}
          </Text>
          <TextInput
            label="Phone"
            onChangeText={form.handleChange('phone')}
            onBlur={form.handleBlur('phone')}
            value={form.values.phone}
          />
          <Text style={styles.invalidText}>
            {form.errors.phone && form.touched && form.errors.phone}
          </Text>
          {children}
        </Card.Content>
      </Card>
    </View>
  );
};

export default SignUpForm;
