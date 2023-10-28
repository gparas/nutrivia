import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import useSearchQueryParams from '@/hooks/useSearchQueryParams';

interface Props {
  param: string;
  items: string[];
}

const Options = ({ param, items }: Props) => {
  const { query, updateSearchParams } = useSearchQueryParams(param);

  return (
    <Stack spacing={3}>
      {items.map(item => {
        const active = query === item;
        return (
          <Button
            key={item}
            size="large"
            endIcon={active && <DoneIcon />}
            variant={active ? 'contained' : 'outlined'}
            color={active ? 'primary' : 'inherit'}
            onClick={() => {
              updateSearchParams(item);
            }}
            sx={{
              height: 56,
              borderRadius: 1.5,
              fontWeight: active ? 'bold' : 'medium',
              justifyContent: 'space-between',
            }}
          >
            {item}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Options;
