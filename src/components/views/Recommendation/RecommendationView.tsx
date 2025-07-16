"use client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Pagination,
} from "@mui/material";
import Image from "next/image";
import { FaLightbulb } from "react-icons/fa6";
import RecommendationFilter from "./RecommendationFIlter";


const recommendations = [
  {
    title: "Siapkan 3x pengeluaran bulanan",
    description: "Sediakan dana darurat minimal 3x pengeluaran bulanan.",
    source: "book",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "education",
  },
  {
    title: "Quote dari Dedy Budiman",
    description: "Dana darurat itu prioritas.",
    source: "influencer",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "education",
  },
  {
    title: "Quote dari Dedy Budiman",
    description: "Dana darurat itu prioritas.",
    source: "influencer",
  },
  // Tambahkan data lainnya
];

export default function RecommendationSection() {
  // const [isCompleteData, setIsCompleteData] = useState(false);
  const isComplete = true;

  return isComplete ? (
    <div className="flex flex-col gap-3">
      <Box
        p={4}
        className="bg-white shadow-[0px_2px_8px_0px_rgba(99,_99,_99,_0.2)] rounded-md"
      >
        <Typography variant="h5" gutterBottom className="text-primary">
          Rekomendasi Strategi: Dana Darurat
        </Typography>

        <Box mb={3}>
          <RecommendationFilter onChange={() => {}} />
        </Box>

        <Grid container spacing={3}>
          {recommendations.map((item, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" mt={1}>
                    {item.description}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    mt={2}
                    display="block"
                  >
                    Sumber: {item.source}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination count={3} />
        </Box>
      </Box>

      <Box
        px={4}
        py={3}
        className="bg-blue-200 shadow-[0px_2px_8px_0px_rgba(99,_99,_99,_0.2)] rounded-md flex flex-col"
      >
        <div className="flex gap-1 text-primary font-bold items-center">
          <p className="text-[1rem]">Tips untuk Pengguna</p>
          <FaLightbulb size={15} />
        </div>

        <div>
          <p className="text-[0.8rem]">Anda dapat memperbarui Rekomendasi dengan melakukan update data pada menu Input Keuangan</p>
        </div>
      </Box>
    </div>
  ) : (
    <div className="h-full w-full flex items-center justify-center">
      <div className=" flex flex-col items-center gap-3 mt-[-3rem]">
        <Image
          alt="fill-data-image"
          src={"/images/illustration/fill-finance.svg"}
          height={300}
          width={300}
        />
        <h1 className="w-1/2 text-center">
          Sebelum Anda mendapatkan Rekomendasi Keuangan, Lengkapi Data pada menu
          <strong> Input Keuangan </strong>Terlebih Dahulu
        </h1>
      </div>
    </div>
  );
}
