importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAZV-QQkisEmC6nKl25x-icUnGNuQy8TH0",
  authDomain: "fileit-ecommerce.firebaseapp.com",
  projectId: "fileit-ecommerce",
  storageBucket: "fileit-ecommerce.firebasestorage.app",
  messagingSenderId: "800115959517",
  appId: "1:800115959517:web:9b6e96d6777777d65b1d34",
  measurementId: "G-T0LDGSM1YQ"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload)=> {
  const notificationTitle = payload.notification.title || 'Título por defecto';
  const notificationOptions = {
    body: payload.notification.body || 'Mensaje por defecto',
    icon: payload.notification.icon || '/icon.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);

});