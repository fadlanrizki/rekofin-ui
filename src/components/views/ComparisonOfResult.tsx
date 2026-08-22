"use client";

import { ConsultationService } from "@/service/consultationService";
import { ROUTE_PATHS } from "@/utils/constants/routes";
import {
  Alert,
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ComparisonValue =
  | Record<string, any>
  | any[]
  | string
  | number
  | boolean
  | null;

type ComparisonData = {
  before?: ComparisonValue;
  after?: ComparisonValue;
  note?: string;
  savedAt?: string;
};

const normalizeFactList = (value: any) => {
  if (!Array.isArray(value)) return [];

  return value.map((item) => ({
    code: item?.code ?? "-",
    question: item?.question ?? item?.fact ?? "-",
    fact: item?.fact ?? item?.question ?? "-",
  }));
};

const normalizeRecommendationList = (value: any) => {
  if (!Array.isArray(value)) return [];

  return value.map((item) => ({
    id: item?.id ?? undefined,
    title: item?.title ?? "-",
    content: item?.content ?? "-",
    conclusionId: item?.conclusionId ?? undefined,
  }));
};

const normalizeConclusionList = (value: any) => {
  if (!Array.isArray(value)) return [];

  return value.map((item) => ({
    id: item?.id ?? undefined,
    code: item?.code ?? "-",
    category: item?.category ?? "-",
    description: item?.description ?? "-",
    recommendations: normalizeRecommendationList(item?.recommendations),
  }));
};

const serializeValue = (value: any) => {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  return JSON.stringify(value);
};

const areItemsDifferent = (left: any, right: any) => {
  return serializeValue(left) !== serializeValue(right);
};

const isObjectEmpty = (value: any) => {
  if (!value) return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

const buildComparisonSection = (entry: any) => {
  const conclusions = normalizeConclusionList(entry?.conclusions);
  const facts = normalizeFactList(entry?.facts);
  const recommendations = conclusions.flatMap((conclusion) =>
    conclusion.recommendations.map((recommendation) => ({
      ...recommendation,
      conclusionCategory: conclusion.category,
    })),
  );

  return {
    conclusion: conclusions[0] ?? null,
    facts,
    recommendations,
  };
};

export default function ComparisonOfResult() {
  const router = useRouter();
  const [comparison, setComparison] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestComparison = async () => {
      try {
        setLoading(true);
        const response =
          await ConsultationService.getLatestConsultationResult();
        const latestComparison = response?.data?.comparison ?? null;
        const normalizedComparison =
          latestComparison && typeof latestComparison === "object"
            ? {
                ...(latestComparison as Record<string, any>),
                note:
                  response?.data?.note ??
                  (latestComparison as Record<string, any>).note,
                savedAt:
                  response?.data?.savedAt ??
                  (latestComparison as Record<string, any>).savedAt,
              }
            : null;

        setComparison(normalizedComparison);
        setError(
          normalizedComparison
            ? null
            : "Belum ada data perbandingan untuk ditampilkan.",
        );
      } catch (err: any) {
        setError(err?.message || "Gagal memuat data perbandingan.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestComparison();
  }, []);

  const beforeSection = useMemo(
    () => buildComparisonSection(comparison?.before ?? null),
    [comparison],
  );

  const afterSection = useMemo(
    () => buildComparisonSection(comparison?.after ?? null),
    [comparison],
  );

  const conclusionChanged = areItemsDifferent(
    beforeSection.conclusion?.category,
    afterSection.conclusion?.category,
  );

  const factsChanged = (() => {
    const leftFacts = beforeSection.facts;
    const rightFacts = afterSection.facts;

    if (leftFacts.length !== rightFacts.length) return true;

    return leftFacts.some((fact, index) => {
      const nextFact = rightFacts[index];
      return (
        fact.code !== nextFact?.code ||
        fact.fact !== nextFact?.fact ||
        fact.question !== nextFact?.question
      );
    });
  })();

  const recommendationsChanged = (() => {
    const leftRecommendations = beforeSection.recommendations;
    const rightRecommendations = afterSection.recommendations;

    if (leftRecommendations.length !== rightRecommendations.length) return true;

    return leftRecommendations.some((item, index) => {
      const nextItem = rightRecommendations[index];
      return (
        item.title !== nextItem?.title ||
        item.content !== nextItem?.content ||
        item.conclusionCategory !== nextItem?.conclusionCategory
      );
    });
  })();

  const hasAnyDifference =
    conclusionChanged || factsChanged || recommendationsChanged;

  if (loading) {
    return (
      <Stack spacing={3}>
        <Skeleton variant="rectangular" height={72} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={260} sx={{ borderRadius: 3 }} />
      </Stack>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Perbandingan Hasil Konsultasi
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ringkasan perubahan sebelum dan sesudah konsultasi terakhir Anda.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => router.push(ROUTE_PATHS.USER.DASHBOARD)}
        >
          Kembali ke Dashboard
        </Button>
      </Stack>

      {error ? (
        <Alert severity="info">{error}</Alert>
      ) : (
        <>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              background:
                "linear-gradient(135deg, rgba(25,118,210,0.04), rgba(76,175,80,0.04))",
            }}
          >
            <Stack direction="column" spacing={1.5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={600}
              >
                Catatan Konsultan
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {comparison?.note || "Tidak ada catatan perbandingan."}
              </Typography>
              {comparison?.savedAt && (
                <Chip
                  label={new Date(comparison.savedAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: "flex-start" }}
                />
              )}
            </Stack>
          </Paper>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Stack spacing={3}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: conclusionChanged ? "error.main" : "divider",
                      backgroundColor: conclusionChanged
                        ? "rgba(244, 67, 54, 0.08)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Kesimpulan
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="error.main"
                    >
                      {beforeSection.conclusion?.category ?? "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {beforeSection.conclusion?.code ?? "-"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: factsChanged ? "error.main" : "divider",
                      backgroundColor: factsChanged
                        ? "rgba(244, 67, 54, 0.06)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Fakta yang dipilih
                    </Typography>
                    <Stack spacing={1.25} sx={{ mt: 1.5 }}>
                      {isObjectEmpty(beforeSection.facts) ? (
                        <Typography variant="body2" color="text.secondary">
                          Tidak ada fakta yang dipilih.
                        </Typography>
                      ) : (
                        beforeSection.facts.map((fact) => (
                          <Box
                            key={`${fact.code}-${fact.fact}`}
                            sx={{
                              p: 1.25,
                              borderRadius: 1.5,
                              backgroundColor: "grey.50",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {fact.code}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {fact.fact}
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: recommendationsChanged
                        ? "error.main"
                        : "divider",
                      backgroundColor: recommendationsChanged
                        ? "rgba(244, 67, 54, 0.06)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Rekomendasi
                    </Typography>
                    <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                      {beforeSection.recommendations.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Tidak ada rekomendasi.
                        </Typography>
                      ) : (
                        beforeSection.recommendations.map(
                          (recommendation, index) => (
                            <Box
                              key={`${recommendation.title}-${index}`}
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: "grey.50",
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight={700}>
                                {recommendation.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ mt: 0.75, whiteSpace: "pre-line" }}
                              >
                                {recommendation.content}
                              </Typography>
                            </Box>
                          ),
                        )
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "divider",
                  backgroundColor: "background.paper",
                }}
              >
                <Stack spacing={3}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: conclusionChanged
                        ? "success.main"
                        : "divider",
                      backgroundColor: conclusionChanged
                        ? "rgba(76, 175, 80, 0.08)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Kesimpulan
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="success.main"
                    >
                      {afterSection.conclusion?.category ?? "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {afterSection.conclusion?.code ?? "-"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: factsChanged ? "success.main" : "divider",
                      backgroundColor: factsChanged
                        ? "rgba(76, 175, 80, 0.06)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Fakta yang dipilih
                    </Typography>
                    <Stack spacing={1.25} sx={{ mt: 1.5 }}>
                      {isObjectEmpty(afterSection.facts) ? (
                        <Typography variant="body2" color="text.secondary">
                          Tidak ada fakta yang dipilih.
                        </Typography>
                      ) : (
                        afterSection.facts.map((fact) => (
                          <Box
                            key={`${fact.code}-${fact.fact}`}
                            sx={{
                              p: 1.25,
                              borderRadius: 1.5,
                              backgroundColor: "grey.50",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {fact.code}
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {fact.fact}
                            </Typography>
                          </Box>
                        ))
                      )}
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: recommendationsChanged
                        ? "success.main"
                        : "divider",
                      backgroundColor: recommendationsChanged
                        ? "rgba(76, 175, 80, 0.06)"
                        : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Rekomendasi
                    </Typography>
                    <Stack spacing={1.5} sx={{ mt: 1.5 }}>
                      {afterSection.recommendations.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          Tidak ada rekomendasi.
                        </Typography>
                      ) : (
                        afterSection.recommendations.map(
                          (recommendation, index) => (
                            <Box
                              key={`${recommendation.title}-${index}`}
                              sx={{
                                p: 1.5,
                                borderRadius: 2,
                                backgroundColor: "grey.50",
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight={700}>
                                {recommendation.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ mt: 0.75, whiteSpace: "pre-line" }}
                              >
                                {recommendation.content}
                              </Typography>
                            </Box>
                          ),
                        )
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: hasAnyDifference ? "warning.main" : "divider",
              backgroundColor: hasAnyDifference
                ? "rgba(255, 193, 7, 0.08)"
                : "transparent",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="warning.main"
            >
              Perbedaan yang tersorot
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 1, flexWrap: "wrap", gap: 1 }}
            >
              {!hasAnyDifference ? (
                <Typography variant="body2" color="text.secondary">
                  Tidak ada perbedaan yang signifikan antara kedua sesi.
                </Typography>
              ) : (
                <>
                  {conclusionChanged && (
                    <Chip
                      label={`Kesimpulan: ${beforeSection.conclusion?.category ?? "-"} → ${afterSection.conclusion?.category ?? "-"}`}
                      color="warning"
                      variant="filled"
                    />
                  )}
                  {factsChanged && (
                    <Chip
                      label="Fakta yang dipilih berbeda"
                      color="warning"
                      variant="filled"
                    />
                  )}
                  {recommendationsChanged && (
                    <Chip
                      label="Rekomendasi berbeda"
                      color="warning"
                      variant="filled"
                    />
                  )}
                </>
              )}
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
}
