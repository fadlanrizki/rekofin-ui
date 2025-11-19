"use client";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Pagination,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Image from "next/image";
import { FaLightbulb } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";

const recommendationsDummy = [
  {
    title: "Siapkan 3x pengeluaran bulanan",
    description: "Sediakan dana darurat minimal 3x pengeluaran bulanan.",
    source: "book",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "educational",
  },
  {
    title: "Quote dari Dedy Budiman",
    description: "Dana darurat itu prioritas.",
    source: "influencer",
  },
  {
    title: "Gunakan e-wallet terpisah",
    description: "Pisahkan akun dompet digital untuk keperluan harian.",
    source: "educational",
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
  const [recommendations, setRecommendations] = useState(recommendationsDummy);
  const [source, setSource] = useState("all");
  const isComplete = true;

  useEffect(() => {
    fetchRecommendation();
  });

  const fetchRecommendation = async () => {
    try {
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleChangeSource = (event: SelectChangeEvent) => {
    setSource(event.target.value as string);
  };

  const getCardIconBySource = (sourceType: string) => {
    switch (sourceType) {
      case "book":
        return <FaBook color="#fff" size={18} width={"18px"} />;
      case "educational":
        return <MdCastForEducation color="#fff" size={18} width={"18px"} />;
      case "influencer":
        return <FaUserCheck color="#fff" size={18} width={"18px"} />;
    }
  };

  return isComplete ? (
    <div className="flex flex-col gap-3">
      <Box
        p={4}
        className="bg-white shadow-[0px_2px_8px_0px_rgba(99,_99,_99,_0.2)] rounded-md"
      >
        <Typography variant="h5" gutterBottom className="text-primary">
          Rekomendasi Strategi: <span className="font-bold">Dana Darurat</span>
        </Typography>

        <Box mb={3}>
          <div className="flex flex-wrap gap-2 mt-4">
            <TextField label={"search"} size="small" />

            <FormControl
              size="small"
              sx={{
                width: "250px",
              }}
            >
              <InputLabel id="select_source_label">Source</InputLabel>
              <Select
                labelId="select_source_label"
                id="select_source_label"
                value={source}
                label="Source"
                onChange={handleChangeSource}
              >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"book"}>Book</MenuItem>
                <MenuItem value={"educational"}>Educational</MenuItem>
                <MenuItem value={"influencer"}>Financial Influencer</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>

        <Grid container spacing={3}>
          {recommendations.map((item, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <div className="max-w-sm p-6 bg-white rounded-2xl shadow-md ring-1 ring-gray-200 flex items-center gap-4">
                <div className="w-12 px-3 h-12 bg-primary rounded-xl flex items-center justify-center">
                  {getCardIconBySource(item.source)}
                </div>
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 mt-1 line-clamp-1">
                    {item.description}
                  </p>
                  <p className="text-right mt-2 text-primary font-medium">Detail</p>
                </div>
              </div>
              {/* <div className="border px-4 py-2">Recommendation Card</div> */}
              {/* <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" mt={1} noWrap>
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
              </Card> */}
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
          <p className="text-[0.8rem]">
            Anda dapat memperbarui Rekomendasi dengan melakukan update data pada
            menu Input Keuangan
          </p>
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
