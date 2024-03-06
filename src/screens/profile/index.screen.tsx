import {ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getUser} from '../../services/api-services/firebase/firestore.service';
import {getFile} from '../../services/api-services/firebase/storage.service';

import Profile from '../../components/profile/index.component';

import {styles} from './styles.screen';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const user = useSelector((state: any) => state.userReducer.user);
  const [profile, setProfile] = useState<any>(null);
  const [imageUri, setImageUri] = useState<any>('');

  useEffect(() => {
    const getUserData = async (email: string): Promise<void> => {
      if (user) {
        const data = await getUser(email);
        setProfile({...data});
      }
    };
    getUserData(user.email);
  }, [user]);

  useEffect(() => {
    const getImage = async () => {
      if (profile) {
        const uri = await getFile(`images/LR.png`);
        setImageUri(uri);
      }
    };
    getImage();
  }, [profile]);

  const renderProfileDetails = () => (
    <Profile profile={profile} imageUri={imageUri} />
  );

  const renderProfile = () => {
    if (profile && imageUri) {
      return renderProfileDetails();
    }
  };

  return <ScrollView style={styles.container}>{renderProfile()}</ScrollView>;
};

export default ProfileScreen;
