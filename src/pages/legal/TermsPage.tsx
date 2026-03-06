import LegalLayout from "./LegalLayout";

const TermsPage = () => (
  <LegalLayout title="Kullanım Şartları">
    <p>Bu web sitesi bilgilendirme ve ön başvuru amaçlıdır.</p>
    <p>İçerikler eğitim odaklıdır; yatırım, finansal veya hukuki danışmanlık değildir.</p>
    <p>Program sonuçları kişisel çaba, zaman ve geçmiş deneyime göre değişebilir. Gelir veya iş garantisi verilmez.</p>
    <p>Site içeriği önceden bildirim olmadan güncellenebilir.</p>
    <p>İletişim: <a href="mailto:hello@skyshift.com.tr" className="text-primary underline">hello@skyshift.com.tr</a></p>
    <p>Son güncelleme: 06.03.2026</p>
  </LegalLayout>
);

export default TermsPage;
