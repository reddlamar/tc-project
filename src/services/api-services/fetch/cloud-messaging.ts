export const sendNotification = async (message: string, token: any) => {
  console.log('Token', token);

  try {
    const response = await fetch(
      'https://fcm.googleapis.com/v1/projects/tc-project-a39f9/messages:send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer AAAAoOt5hcY:APA91bHlXEY3LwxTDZuU7aVT1whpE5gjgNg0Lk9j5fxk2MsywTeAl27KmfjJmKF7YspYGOjmIPjXlaDMcXNiqhJcoCEuFgrcJsA6FHwbHdMuLmTipOgMgTBnvImbNlFLWLjD67Fdr-mM',
        },
        body: JSON.stringify({
          API_Key: 'AIzaSyBy_Eq5m5w6eexsM9GTbCt66QgYvlKUBgE',
          message: {
            token:
              'ePfWOShl-UJirUx_aEYMMj:APA91bEacMUROx5TlbtemUaeD_BpgcRj_Hsx9cn3G8guCBz3Tv7-AifmSxEBIlW3GNmZpQBSCcBcFL56qoraHSMOAjrPvRm5J_AdAHJsZNUJpSdIEQh9C-OTF7PYpcFhFLrXix9L2omF',
            data: {},
            notification: {
              body: message,
              title: 'Delivery Message',
            },
          },
        }),
      },
    );
    console.log('Response:', await response.json());
  } catch (error) {
    console.log('Send Notification Error:', error);
  }
};
