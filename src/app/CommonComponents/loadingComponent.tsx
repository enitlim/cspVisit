import React from 'react'
import {  Stack, Skeleton, Typography} from "@mui/material";
export const LoadingTable = ({loadingMessage}:{loadingMessage:string}) => {
  return (
    <div>
      {" "}
      <Stack spacing={1}>
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {loadingMessage}
        </Typography>
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
        <Skeleton variant="rounded" width="100%" height={60} />
      </Stack>
    </div>
  );
}

