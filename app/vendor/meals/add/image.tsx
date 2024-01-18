'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import NextImage from 'next/image';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Props } from './types';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface CloudinaryResult {
  secure_url: string;
}

const Image = ({ onClickBack, onClickNext, initData }: Props) => {
  const [url, setUrl] = useState(initData.image);

  const handleContinue = () => {
    onClickNext({ image: url });
  };

  return (
    <>
      <Stack
        mt={1}
        mb={2}
        height={200}
        justifyContent="center"
        alignItems="center"
        spacing={1}
        borderRadius={1}
        border={1}
        borderColor="action.disabled"
        sx={{ borderStyle: 'dashed' }}
      >
        {url ? (
          <Avatar
            variant="rounded"
            sx={{
              width: 180,
              height: 180,
              position: 'relative',
              bgcolor: 'transparent',
            }}
          >
            <NextImage
              src={url}
              width={180}
              height={180}
              alt={initData.name || 'food'}
              style={{ objectFit: 'cover' }}
            />
          </Avatar>
        ) : (
          <>
            <CloudUploadIcon />
            <Typography variant="body1" mb={2}>
              File upload
            </Typography>
            <CldUploadWidget
              uploadPreset="kszwm4lz"
              options={{
                tags: ['food'],
                sources: ['local', 'url'],
                multiple: false,
                maxFiles: 1,
              }}
              onUpload={result => {
                if (result.event !== 'success') return;
                const info = result.info as CloudinaryResult;
                setUrl(info.secure_url);
              }}
            >
              {({ open }) => {
                return (
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => open()}
                    sx={{ fontWeight: 500 }}
                  >
                    Select a file
                  </Button>
                );
              }}
            </CldUploadWidget>
          </>
        )}
      </Stack>
      <Stack direction="row" alignItems="flex-start" spacing={1}>
        <Button variant="contained" onClick={handleContinue}>
          Continue
        </Button>
        <Button onClick={onClickBack} color="inherit" sx={{ fontWeight: 500 }}>
          Back
        </Button>
      </Stack>
    </>
  );
};

export default Image;
