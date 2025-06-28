import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";

const SectionFAQ = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-1/2">
        <h2 className="text-3xl font-bold text-[#003366]">
          FAQ (Frequently Asked Questions)
        </h2>
        <div className="mt-10">
          <Accordion>
            <AccordionSummary
              //   expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Apa itu Finwise</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Finwise adalah aplikasi berbasis web yang berfungsi untuk
              memberikan rekomendasi strategi pengelolaan keuangan yang
              diperuntukan bagi karyawan berdasarkan
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              //   expandIcon={<ExpandMoreIcon />}
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
              //   expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">
                Bagaimana cara kerja metode Forward Chaining
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default SectionFAQ;
