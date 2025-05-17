import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // โหลดไฟล์การแปลจากเซิร์ฟเวอร์หรือ local
  .use(LanguageDetector) // ตรวจจับภาษาของผู้ใช้
  .use(initReactI18next) // ใช้งานร่วมกับ react-i18next
  .init({
    fallbackLng: 'en', // ภาษาเริ่มต้นหากไม่มีการแปล
    debug: true, // เปิด debug mode
    interpolation: {
      escapeValue: false, // ไม่ต้อง escape HTML
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // ที่อยู่ไฟล์การแปล
    },
  });

export default i18n;