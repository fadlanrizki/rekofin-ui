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
import { useEffect, useMemo, useRef, useState } from "react";
import { FiInfo, FiTarget, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

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
    priority: typeof item?.priority === "number" ? item.priority : undefined,
    recommendations: normalizeRecommendationList(item?.recommendations),
  }));
};

// Kategori kesimpulan yang berada di tahap akhir (investasi berdasarkan profil risiko
// dan prinsip finansial) tidak bisa dibandingkan naik/turun berdasarkan priority.
const EXEMPT_CATEGORY_PATTERN = /profil risiko|prinsip finansial/i;

type ConclusionSummaryType =
  | "insufficient"
  | "same"
  | "exempt"
  | "decline"
  | "improve"
  | "neutral";

const buildConsultationSummary = (
  beforeSection: ReturnType<typeof buildComparisonSection>,
  afterSection: ReturnType<typeof buildComparisonSection>,
) => {
  const beforeConclusion = beforeSection.conclusion;
  const afterConclusion = afterSection.conclusion;

  if (!beforeConclusion || !afterConclusion) {
    return {
      type: "insufficient" as ConclusionSummaryType,
      title: "Ringkasan Belum Tersedia",
      message:
        "Belum cukup data kesimpulan untuk membuat ringkasan perbandingan konsultasi.",
      recommendations: [] as typeof afterSection.recommendations,
    };
  }

  const sameConclusion =
    beforeConclusion.id !== undefined && afterConclusion.id !== undefined
      ? beforeConclusion.id === afterConclusion.id
      : beforeConclusion.category === afterConclusion.category;

  if (sameConclusion) {
    return {
      type: "same" as ConclusionSummaryType,
      title: "Tidak Ada Perubahan",
      message:
        "Tidak ada perubahan kesimpulan pada konsultasi kali ini. Cek kembali jawaban Anda dan sesuaikan dengan kondisi keuangan Anda saat ini.",
      recommendations: [] as typeof afterSection.recommendations,
    };
  }

  const combinedCategoryText = [
    beforeConclusion.category,
    beforeConclusion.description,
    afterConclusion.category,
    afterConclusion.description,
  ].join(" ");

  if (EXEMPT_CATEGORY_PATTERN.test(combinedCategoryText)) {
    return {
      type: "exempt" as ConclusionSummaryType,
      title: "Kondisi Keuangan Anda Sudah Matang",
      message: `Kesimpulan Anda berubah dari "${beforeConclusion.category}" menjadi "${afterConclusion.category}". Perubahan ini merupakan bagian dari penyesuaian strategi investasi berdasarkan profil risiko dan prinsip finansial, bukan indikasi kemunduran maupun kemajuan. Pertahankan konsistensi dalam menerapkan kebiasaan keuangan yang sehat.`,
      recommendations: afterSection.recommendations.slice(0, 3),
    };
  }

  const beforePriority = beforeConclusion.priority;
  const afterPriority = afterConclusion.priority;

  if (
    typeof beforePriority === "number" &&
    typeof afterPriority === "number" &&
    beforePriority !== afterPriority
  ) {
    if (beforePriority > afterPriority) {
      return {
        type: "decline" as ConclusionSummaryType,
        title: "Perlu Perhatian Lebih",
        message:
          "Kondisi keuangan Anda saat ini menunjukkan adanya kemunduran dibandingkan sebelumnya. Jangan berkecil hati, ini adalah kesempatan baik untuk memperbaiki kembali kebiasaan finansial Anda. Berikut beberapa saran perbaikan yang bisa Anda terapkan:",
        recommendations: afterSection.recommendations.slice(0, 3),
      };
    }

    return {
      type: "improve" as ConclusionSummaryType,
      title: "Kemajuan Finansial yang Baik",
      message:
        "Kondisi keuangan Anda mengalami kemajuan dibandingkan sebelumnya. Pertahankan kebiasaan baik ini dan pertimbangkan beberapa rekomendasi tindakan selanjutnya berikut untuk terus meningkatkan kesehatan finansial Anda:",
      recommendations: afterSection.recommendations.slice(0, 3),
    };
  }

  return {
    type: "neutral" as ConclusionSummaryType,
    title: "Kesimpulan Konsultasi Berbeda",
    message: `Kesimpulan Anda berubah dari "${beforeConclusion.category}" menjadi "${afterConclusion.category}". Teruslah menjaga kondisi keuangan Anda dan perhatikan rekomendasi berikut.`,
    recommendations: afterSection.recommendations.slice(0, 3),
  };
};

const SUMMARY_PRESENTATION: Record<
  ConclusionSummaryType,
  {
    icon: typeof FiInfo;
    color: "info" | "warning" | "success";
    backgroundColor: string;
  }
> = {
  insufficient: {
    icon: FiInfo,
    color: "info",
    backgroundColor: "rgba(33, 150, 243, 0.06)",
  },
  same: {
    icon: FiInfo,
    color: "info",
    backgroundColor: "rgba(33, 150, 243, 0.06)",
  },
  exempt: {
    icon: FiTarget,
    color: "info",
    backgroundColor: "rgba(33, 150, 243, 0.06)",
  },
  decline: {
    icon: FiTrendingDown,
    color: "warning",
    backgroundColor: "rgba(255, 193, 7, 0.08)",
  },
  improve: {
    icon: FiTrendingUp,
    color: "success",
    backgroundColor: "rgba(46, 204, 113, 0.08)",
  },
  neutral: {
    icon: FiInfo,
    color: "info",
    backgroundColor: "rgba(33, 150, 243, 0.06)",
  },
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
  const recommendations = normalizeRecommendationList(entry?.recommendations);

  return {
    consultationId: entry?.consultationId ?? null,
    conclusion: conclusions[0] ?? null,
    facts,
    recommendations,
  };
};

type RecommendationCardProps = {
  title: string;
  content: string;
  accentColor: "primary" | "success";
  borderColor: string;
  shadow: string;
};

function RecommendationCard({
  title,
  content,
  accentColor,
  borderColor,
  shadow,
}: RecommendationCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const checkOverflow = () => {
      setCanExpand(
        contentElement.scrollHeight > contentElement.clientHeight + 1,
      );
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(contentElement);

    return () => resizeObserver.disconnect();
  }, [content]);

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "#ffffff",
        border: `1px solid ${borderColor}`,
        boxShadow: shadow,
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} color="text.primary">
        {title}
      </Typography>
      <Typography
        ref={contentRef}
        variant="body2"
        sx={{
          mt: 0.75,
          whiteSpace: "pre-line",
          ...(expanded
            ? {}
            : {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }),
        }}
      >
        {content}
      </Typography>
      {canExpand && (
        <Button
          size="small"
          color={accentColor}
          onClick={() => setExpanded((current) => !current)}
          sx={{ minWidth: 0, p: 0, mt: 1, fontWeight: 700 }}
        >
          {expanded ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
        </Button>
      )}
    </Box>
  );
}

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
        item.conclusionId !== nextItem?.conclusionId
      );
    });
  })();

  const hasAnyDifference =
    conclusionChanged || factsChanged || recommendationsChanged;

  const summary = useMemo(
    () => buildConsultationSummary(beforeSection, afterSection),
    [beforeSection, afterSection],
  );

  const SummaryIcon = SUMMARY_PRESENTATION[summary.type].icon;
  const summaryColor = SUMMARY_PRESENTATION[summary.type].color;
  const summaryBackgroundColor =
    SUMMARY_PRESENTATION[summary.type].backgroundColor;

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
              boxShadow: "0 8px 24px rgba(0, 51, 102, 0.08)",
              background: "#fff",
            }}
          >
            <Stack direction="column" spacing={1.5}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontWeight={600}
              >
                Catatan Konsultasi
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.8, fontWeight: "bold" }}
              >
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

          <Paper
            elevation={2}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: `${summaryColor}.main`,
              backgroundColor: summaryBackgroundColor,
              boxShadow: "0 8px 24px rgba(0, 51, 102, 0.08)",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  flexShrink: 0,
                  backgroundColor: `${summaryColor}.main`,
                  color: "#fff",
                }}
              >
                <SummaryIcon size={22} />
              </Box>
              <Stack spacing={1.25} flex={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color={`${summaryColor}.dark`}
                >
                  {summary.title}
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  {summary.message}
                </Typography>
                {summary.recommendations.length > 0 && (
                  <Stack spacing={1} sx={{ mt: 0.5 }}>
                    {summary.recommendations.map((recommendation, index) => (
                      <Box
                        key={`${recommendation.title}-${index}`}
                        sx={{
                          p: 1.25,
                          borderRadius: 1.5,
                          backgroundColor: "#ffffff",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color="text.primary"
                        >
                          {recommendation.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {recommendation.content}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                )}
              </Stack>
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
                  borderColor: "rgba(0, 51, 102, 0.16)",
                  borderTop: "4px solid",
                  borderTopColor: "error.main",
                  backgroundColor: "#f7faff",
                  boxShadow: "0 10px 28px rgba(0, 51, 102, 0.10)",
                }}
              >
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight={700}>
                      Konsultasi Sebelumnya
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: conclusionChanged ? "error.main" : "divider",
                      backgroundColor: conclusionChanged
                        ? "rgba(244, 67, 54, 0.08)"
                        : "rgba(0, 51, 102, 0.05)",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Kesimpulan
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={conclusionChanged ? "error.main" : "primary.main"}
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
                        : "rgba(255, 255, 255, 0.82)",
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
                              backgroundColor: "#ffffff",
                              border: "1px solid rgba(0, 51, 102, 0.08)",
                              boxShadow: "0 3px 10px rgba(0, 51, 102, 0.05)",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {fact.code}
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
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
                        : "rgba(255, 255, 255, 0.82)",
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
                            <RecommendationCard
                              key={`${recommendation.title}-${index}`}
                              title={recommendation.title}
                              content={recommendation.content}
                              accentColor="primary"
                              borderColor="rgba(0, 51, 102, 0.08)"
                              shadow="0 3px 10px rgba(0, 51, 102, 0.05)"
                            />
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
                  borderColor: "rgba(46, 204, 113, 0.24)",
                  borderTop: "4px solid",
                  borderTopColor: "secondary.main",
                  backgroundColor: "#f7fcf8",
                  boxShadow: "0 10px 28px rgba(46, 130, 80, 0.12)",
                }}
              >
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight={700}>
                      Konsultasi Saat Ini
                    </Typography>
                  </Stack>

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
                        : "rgba(46, 204, 113, 0.06)",
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Kesimpulan
                    </Typography>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color={
                        conclusionChanged ? "success.main" : "secondary.main"
                      }
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
                        : "rgba(255, 255, 255, 0.82)",
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
                              backgroundColor: "#ffffff",
                              border: "1px solid rgba(46, 204, 113, 0.14)",
                              boxShadow: "0 3px 10px rgba(46, 130, 80, 0.06)",
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                            >
                              {fact.code}
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
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
                        : "rgba(255, 255, 255, 0.82)",
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
                            <RecommendationCard
                              key={`${recommendation.title}-${index}`}
                              title={recommendation.title}
                              content={recommendation.content}
                              accentColor="success"
                              borderColor="rgba(46, 204, 113, 0.14)"
                              shadow="0 3px 10px rgba(46, 130, 80, 0.06)"
                            />
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
