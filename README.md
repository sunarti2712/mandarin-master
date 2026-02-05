
# Cara Build APK (Android) & IPA (iOS)

Aplikasi ini dikembangkan dengan React. Untuk menjadikannya aplikasi mobile asli, gunakan **Capacitor**:

### 1. Prasyarat
- Install Node.js
- Install Android Studio (untuk APK)
- Install Xcode (untuk iOS - hanya bisa di Mac)

### 2. Langkah-langkah Build
1. **Inisialisasi Capacitor:**
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init "Mandarin Master" "com.mandarin.master" --web-dir .
   ```

2. **Tambahkan Platform:**
   ```bash
   npm install @capacitor/android @capacitor/ios
   npx cap add android
   npx cap add ios
   ```

3. **Sinkronisasi Kode:**
   Setiap ada perubahan kode, jalankan:
   ```bash
   npx cap copy
   ```

4. **Buka Project di Studio:**
   ```bash
   npx cap open android  # Membuka Android Studio untuk build APK
   npx cap open ios      # Membuka Xcode untuk build iOS app
   ```

### 3. Fitur Mobile yang Aktif
- **PWA Ready**: Bisa langsung "Add to Home Screen" dari Chrome/Safari.
- **Vibration**: Getaran saat menjawab kuis.
- **Safe Area**: Kompatibel dengan notch iPhone.
