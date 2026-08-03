import { Alert, Box, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { useHealth } from '@/hooks/useHealth';

export function HomePage() {
  const { data, isLoading, isError, error } = useHealth();

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" gutterBottom>
          Enterprise Banking Management System
        </Typography>
        <Typography color="text.secondary">
          Foundation scaffold is ready. Authentication and domain modules will be added next.
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography>Checking API health…</Typography>
        </Box>
      )}

      {isError && (
        <Alert severity="warning">
          API health check unavailable. Ensure the backend is running.
          {error instanceof Error ? ` (${error.message})` : ''}
        </Alert>
      )}

      {data && (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          <Chip
            label={`Status: ${data.status}`}
            color={data.status === 'ok' ? 'success' : 'warning'}
          />
          <Chip label={`MongoDB: ${data.checks.mongodb}`} variant="outlined" />
          <Chip label={`Version: ${data.version}`} variant="outlined" />
        </Stack>
      )}
    </Stack>
  );
}
