import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  return (
    <section id="faq" className="w-full py-20 flex justify-center">
      <div className="w-3/4 md:w-1/2">
        <h2 className="text-3xl font-bold text-[#003366] text-center">
          FAQ
          <br />
          (Frequently Asked Questions)
        </h2>
        <div className="mt-10">
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Apa itu Rekofin</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Rekofin adalah aplikasi berbasis web yang berfungsi untuk
              memberikan rekomendasi strategi pengelolaan keuangan yang
              diperuntukan bagi karyawan berdasarkan kondisi finansial yang di
              input oleh user.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Apa itu Sistem Pakar</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Sistem Pakar adalah sebuah program komputer yang mencoba meniru
              atau mensimulasikan pengetahuan <strong>( knowledge )</strong> dan
              keterampilan
              <strong> ( skill )</strong> dari seorang pakar pada area tertentu
              yang selanjutnya sistem ini akan mencoba memecahkan suatu
              permasalahan sesuai dengan kepakarannya.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Apa itu Forward Chaining</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Forward Chaining disebut juga pendekatan berbasis data{" "}
              <strong>(data-driven approach)</strong>. Proses ini dimulai dari
              fakta-fakta yang ada, lalu bergerak maju untuk mencari kesimpulan
              dengan menggunakan aturan yang cocok. Pendekatan ini cenderung
              eksploratif, karena menggunakan semua informasi yang ada hingga
              menemukan hasil akhir.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">
                Bagaimana Cara Kerja Forward Chaining
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="block">
                <ul>
                  <li>Sistem memulai dengan kumpulan fakta awal.</li>
                  <li>
                    Fakta tersebut dievaluasi terhadap if-then rules yang ada.
                  </li>
                  <li>
                    Jika kondisi pada bagian “if” dari sebuah aturan terpenuhi,
                    maka bagian “then” akan diaktifkan.
                  </li>
                  <li>
                    Proses berlanjut hingga ditemukan kesimpulan atau tidak ada
                    aturan lagi yang bisa diterapkan.
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
