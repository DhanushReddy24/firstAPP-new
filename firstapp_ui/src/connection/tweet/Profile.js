import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const Profile = () => {
    return (
            <Stack spacing={1}>
              <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
              <Skeleton variant="circular" width={200} height={200} />
              <Skeleton variant="rectangular" width={710} height={200} />
              <Skeleton variant="rounded" width={710} height={200} />
            </Stack>
          );
}

export default Profile