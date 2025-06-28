// components/shared/Footer.tsx

function SectionFooter() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <h2 className="text-xl font-bold mb-2">Finwise</h2>
          <p className="text-sm text-gray-400">
            Aplikasi sistem pakar untuk membantu karyawan mengelola keuangan secara cerdas dan efisien.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase">Navigasi</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><a href="/dashboard" className="hover:text-white">Home</a></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase">Bantuan</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            <li><a href="/contact" className="hover:text-white">Kontak</a></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-sm font-semibold mb-2 uppercase">Ikuti Kami</h3>
          <ul className="text-sm space-y-1 text-gray-300">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Finwise. All rights reserved.
      </div>
    </footer>
  );
}

export default SectionFooter;