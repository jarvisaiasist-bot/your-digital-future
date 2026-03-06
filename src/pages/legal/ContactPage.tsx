import LegalLayout from "./LegalLayout";

const ContactPage = () => (
  <LegalLayout title="İletişim">
    <p><strong>Marka:</strong> Skyshift</p>
    <p><strong>E-posta:</strong> <a href="mailto:hello@skyshift.com.tr" className="text-primary underline">hello@skyshift.com.tr</a></p>
    <p><strong>Web:</strong> turkiye.top / egitim.turkiye.top</p>
    <p><strong>Not:</strong> Bu site eğitim programları için bilgilendirme ve başvuru amaçlıdır.</p>
    <p>Son güncelleme: 06.03.2026</p>
  </LegalLayout>
);

export default ContactPage;
