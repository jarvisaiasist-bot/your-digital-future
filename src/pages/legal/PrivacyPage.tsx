import LegalLayout from "./LegalLayout";

const PrivacyPage = () => (
  <LegalLayout title="Gizlilik Politikası">
    <p>Bu sayfa Skyshift eğitim programlarına ön başvuru toplamak için kullanılmaktadır.</p>
    <p><strong>Toplanan veriler:</strong> ad, telefon, yaş, şehir ve iletişim bilgileri.</p>
    <p><strong>Kullanım amacı:</strong> başvuru değerlendirmesi, bilgilendirme ve sizinle iletişime geçmek.</p>
    <p><strong>Paylaşım:</strong> verileriniz üçüncü taraflara pazarlama amacıyla satılmaz.</p>
    <p><strong>Haklarınız:</strong> erişim, düzeltme, silme talepleriniz için <a href="mailto:hello@skyshift.com.tr" className="text-primary underline">hello@skyshift.com.tr</a>.</p>
    <p>Son güncelleme: 06.03.2026</p>
  </LegalLayout>
);

export default PrivacyPage;
