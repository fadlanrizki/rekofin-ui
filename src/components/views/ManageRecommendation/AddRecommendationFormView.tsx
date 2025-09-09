"use client";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/utils/constants/routes";

const recommendationForm = z.object({
  title: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  sourceType: z.string().min(1, "Required"),
  sourceName: z.string().min(1, "Required"),
  content: z.string().min(1, "Required"),
  author: z.string().min(1, "Required"),
});

type RecommendationForm = z.infer<typeof recommendationForm>;

export default function AddRecommendationFormView() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecommendationForm>({
    resolver: zodResolver(recommendationForm),
  });

  const onSubmit = (data: RecommendationForm) => {
    console.log(data);
  };

  const handleCancel = () => {
    router.push(ROUTE_PATHS.ADMIN.MANAGE_RECOMMENDATION.LIST);
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="w-full">
        <Typography variant="h6">Add Recommendation</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            size={12}
            direction={"column"}
            spacing={2}
            className="mt-4"
          >
            <div>
              <Typography>Title</Typography>
              <TextField
                {...register("title")}
                fullWidth
                size="small"
                error={!!errors.title}
                placeholder="Title"
              />
              {!!errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <Typography>Category</Typography>
              <TextField
                {...register("category")}
                select
                fullWidth
                size="small"
                error={!!errors.category}
                placeholder="Category"
              >
                <MenuItem value="MENABUNG">Menabung</MenuItem>
                <MenuItem value="DANA_DARURAT">Dana Darurat</MenuItem>
                <MenuItem value="INVESTASI">Investasi</MenuItem>
              </TextField>
              {!!errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Source */}
            <Grid container size={12} spacing={2}>
              <Grid size={6}>
                <Typography>Source Type</Typography>
                <TextField
                  {...register("sourceType")}
                  fullWidth
                  size="small"
                  error={!!errors.sourceType}
                  placeholder="Source Type"
                />
                {!!errors.sourceType && (
                  <p className="text-red-500">{errors.sourceType.message}</p>
                )}
              </Grid>
              <Grid size={6}>
                <Typography>Source Name</Typography>
                <TextField
                  {...register("sourceName")}
                  fullWidth
                  size="small"
                  error={!!errors.sourceName}
                  placeholder="Source Name"
                />
                {!!errors.sourceName && (
                  <p className="text-red-500">{errors.sourceName.message}</p>
                )}
              </Grid>
            </Grid>

            <div>
              <Typography>Author</Typography>
              <TextField
                {...register("author")}
                fullWidth
                size="small"
                error={!!errors.author}
                placeholder="Author"
              />
              {!!errors.author && (
                <p className="text-red-500">{errors.author.message}</p>
              )}
            </div>

            <div>
              <Typography>Content</Typography>
              <TextField
                {...register("content")}
                fullWidth
                multiline={true}
                rows={5}
                size="small"
                error={!!errors.content}
                placeholder="Content"
              />
              {!!errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>

            {/* Save Button */}
            <div>
              <Grid container spacing={2} justifyContent={"flex-end"}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                  className="!mt-6"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="!mt-6"
                >
                  Save Recommendation
                </Button>
              </Grid>
            </div>
          </Grid>
        </form>
        {/* Title */}
      </CardContent>
    </Card>
  );
}
