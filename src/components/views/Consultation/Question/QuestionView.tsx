"use client";
import { ConsultationService } from "@/service/consultationService";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import React, { useEffect, useState } from "react";
import { ROUTE_PATHS } from "@/utils/constants/routes";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{ height: "10px", borderRadius: "5px" }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

type Question = {
  id: number;
  code: string;
  question: string;
  description: string;
  value: string | null;
};

type QuestionsState = {
  total: number;
  data: Question[];
};

export default function QuestionView() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState>({
    total: 0,
    data: [],
  });
  const [percentage, setPercentage] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [consultationId, setConsultationId] = useState<string>("");

  const getQuestions = async (consultationId: string) => {
    try {
      setLoading(true);
      const response = await ConsultationService.getQuestions(consultationId);
      const formattedData = response.data.map((question: Question) => {
        return {
          ...question,
          value: null,
        };
      });

      setQuestions({
        total: formattedData.length,
        data: formattedData,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const consultationId = localStorage.getItem("consultationId");
    if (consultationId) {
      getQuestions(consultationId);
      setConsultationId(consultationId);
    }
  }, []);

  useEffect(() => {
    const getPercentage = () => {
      const percentage =
        (questions.data.filter((question: Question) => question.value !== null)
          .length /
          questions.total) *
        100;

      return percentage;
    };

    const isAllQuestionsAnswered = questions.data.every(
      (question: Question) => question.value !== null,
    );

    setPercentage(getPercentage());
    setDisableSubmit(!isAllQuestionsAnswered);
  }, [questions.data]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentQuestion: number,
  ) => {
    const { value } = event.target;
    setQuestions((prev: any) => {
      return {
        ...prev,
        data: prev.data.map((question: Question, i: number) => {
          if (i === currentQuestion) {
            return {
              ...question,
              value: value,
            };
          }
          return question;
        }),
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = questions.data.map((item: any) => ({
        factId: item.id,
        value: item.value === "Y",
      }));

      const payload = {
        answers: data,
      };

      const response = await ConsultationService.submitConsultationAnswer(
        consultationId,
        payload,
      );
      console.log(JSON.stringify(response));

      router.push(ROUTE_PATHS.USER.CONSULTATION.RESULT);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack direction={"column"} gap={3}>
      {/* progress bar */}

      <Paper sx={{ p: 2 }} elevation={3}>
        <Box>
          <Typography variant="h6" fontWeight={"medium"} color="primary">
            Progress
          </Typography>
          <Typography>
            {currentQuestion + 1} dari {questions.total} Pertanyaan
          </Typography>
          <LinearProgressWithLabel value={percentage} />
        </Box>
      </Paper>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Stack direction={"column"} gap={1}>
          <Typography variant="h6" fontWeight={"medium"} color="primary">
            Pertanyaan
          </Typography>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "divider",
              p: 2,
              borderRadius: "8px",
            }}
          >
            <Typography>
              {questions?.data[currentQuestion]?.question || "-"}
            </Typography>
            <Stack direction={"column"} gap={1}>
              <FormControl>
                <RadioGroup
                  name={`question-${currentQuestion}`}
                  value={questions?.data[currentQuestion]?.value || null}
                  onChange={(event) => handleChange(event, currentQuestion)}
                >
                  <FormControlLabel
                    value={"Y"}
                    control={<Radio />}
                    label="Ya"
                  />
                  <FormControlLabel
                    value={"N"}
                    control={<Radio />}
                    label="Tidak"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Description */}

      <Stack>
        <Typography variant="h6" fontWeight={"medium"} color="primary">
          Keterangan
        </Typography>
        <Alert severity="info">
          {questions?.data[currentQuestion]?.description || "-"}
        </Alert>
      </Stack>

      <Box>
        <Stack direction={"row"} justifyContent={"space-between"}>
          {currentQuestion > 0 ? (
            <Button
              variant="outlined"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              color="primary"
            >
              Sebelumnya
            </Button>
          ) : (
            <div></div>
          )}

          {currentQuestion < questions.total - 1 ? (
            <Button
              variant="contained"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              color="primary"
            >
              Selanjutnya
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              disabled={disableSubmit}
              onClick={handleSubmit}
              loading={loading}
            >
              Selesai
            </Button>
          )}
        </Stack>
      </Box>
    </Stack>
  );
}
