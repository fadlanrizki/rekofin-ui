const SectionAbout = () => {
  return (
    <div id="about" className="py-16 bg-white">
      <div className="max-w-3/4 md:max-w-1/2 mx-auto px-4 space-y-8 text-center">
        <h2 className="text-3xl font-bold text-[#003366]">
          Mengapa Memilih Aplikasi Ini?
        </h2>
        <p className="text-[#2c3e50] text-lg">
          Aplikasi ini membantu Anda mendapatkan rekomendasi strategi
          pengelolaan keuangan berdasarkan profil finansial Anda. Semua
          rekomendasi dikaji dari sumber terpercaya seperti pakar, buku populer,
          dan konten edukatif keuangan.
        </p>
        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div>
            <h3 className="text-xl font-semibold text-[#2ecc71] mb-5">
              Personalisasi Keuangan
            </h3>
            <p className="text-[#555]">
              Sistem akan menyesuaikan rekomendasi dengan pemasukan, tabungan,
              dan investasi Anda.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#2ecc71] mb-5">
              Berdasarkan Pengetahuan Pakar
            </h3>
            <p className="text-[#555]">
              Menggunakan metode forward chaining untuk menyimpulkan strategi
              terbaik berdasarkan data Anda.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#2ecc71] mb-5">
              Mudah Digunakan
            </h3>
            <p className="text-[#555]">
              Antarmuka sederhana dan cepat dipahami oleh siapa pun, bahkan
              tanpa latar belakang keuangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionAbout;
