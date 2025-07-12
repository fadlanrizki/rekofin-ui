import { GrMoney } from "react-icons/gr";
import { FaUserGraduate } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";

type AboutType = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const listAboutContent = [
  {
    title: "Personalisasi Keuangan",
    icon: <GrMoney size={50} />,
    description:
      "Membantu Anda mendapatkan rekomendasi strategi pengelolaan keuangan berdasarkan profil finansial Anda.",
  },
  {
    title: "Berdasarkan Pengetahuan Pakar",
    icon: <FaUserGraduate size={50} />,
    description:
      "Menggunakan metode forward chaining untuk menyimpulkan strategi terbaik berdasarkan data Anda.",
  },

  {
    title: "Mudah Digunakan",
    icon: <FaClipboardCheck size={50} />,
    description:
      "Antarmuka sederhana dan cepat dipahami oleh siapa pun, bahkan tanpa latar belakang keuangan.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-40 bg-white">
      <div className="max-w-3/4 mx-auto px-4 space-y-8 text-center">
        <h2 className="text-3xl font-bold text-[#003366]">
          Mengapa Memilih Aplikasi Ini?
        </h2>
        <p className="text-[#2c3e50] text-lg">
          Aplikasi ini membantu Anda mendapatkan rekomendasi strategi
          pengelolaan keuangan berdasarkan profil finansial Anda. Semua
          rekomendasi dikaji dari sumber terpercaya seperti pakar, buku populer,
          dan konten edukatif keuangan.
        </p>
        <div className="grid md:grid-cols-3 gap-10 md:gap-5 text-left">
          {listAboutContent.map((content: AboutType, index) => (
            <div
              key={index}
              className="border-1 border-[#eaeaea] flex flex-col gap-10 items-center p-3 xl:p-7 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            >
              <h3 className="text-[1.2rem] font-semibold text-[#2ecc71] text-center">
                {content.title}
              </h3>
              <div className="text-primary">{content.icon}</div>
              <p className="text-[1rem] text-textMain text-center">{content.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
