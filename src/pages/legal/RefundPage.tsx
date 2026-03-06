import LegalLayout from "./LegalLayout";

const RefundPage = () => (
  <LegalLayout title="İptal ve İade Politikası">
    <p>Bu sitedeki form ücretli satın alma değil, ön görüşme/ön başvuru içindir.</p>
    <p>Ücretli program koşulları kayıt öncesinde ayrıca paylaşılır.</p>
    <p>Ödeme alınan programlarda iade/iptal şartları sözleşmede belirtilir.</p>
    <p>Talep için: <a href="mailto:hello@skyshift.com.tr" className="text-primary underline">hello@skyshift.com.tr</a></p>
    <p>Son güncelleme: 06.03.2026</p>
  </LegalLayout>
);

export default RefundPage;
