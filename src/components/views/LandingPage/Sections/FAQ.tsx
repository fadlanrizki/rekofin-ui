import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaChevronDown } from "react-icons/fa";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider } from "@mui/material";

const FAQ = () => {
  return (
    <section id="faq" className="w-full flex justify-center">
      <div className="w-3/4 md:w-1/2 flex flex-col gap-10 items-center py-30">
        <h2 className="text-3xl font-bold text-[#003366] text-center">
          FAQ
          <br />
          <span className="text-[1.3rem]">(Frequently Asked Questions)</span>
        </h2>
        <p className="text-center text-lg">
          Butuh bantuan? Berikut adalah beberapa pertanyaan umum yang mungkin
          dapat membantu Anda.
        </p>
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaChevronDown />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" className="text-primary">
                <strong>Apa itu Rekofin</strong>
              </Typography>
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
              <Typography component="span" className="text-primary">
                <strong>Apa itu Sistem Pakar</strong>
              </Typography>
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
              <Typography component="span" className="text-primary">
                <strong>Apa itu Forward Chaining</strong>
              </Typography>
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
              <Typography component="span" className="text-primary">
                <strong>Cara Kerja Forward Chaining</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <p>Sistem memulai dengan kumpulan fakta awal.</p>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <p>
                    Fakta tersebut dievaluasi terhadap{" "}
                    <strong> IF-THEN </strong> rules yang ada.
                  </p>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <p>
                    Jika kondisi pada bagian <strong>“IF”</strong> dari sebuah
                    aturan terpenuhi, maka bagian <strong>“THEN”</strong> akan
                    diaktifkan.
                  </p>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <p>
                    Proses berlanjut hingga ditemukan kesimpulan atau tidak ada
                    aturan lagi yang bisa diterapkan.
                  </p>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
