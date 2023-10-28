const step = (active: boolean) => [
  {
    width: 40,
    height: 6,
    borderRadius: 4,
    bgcolor: 'grey.300',
    transition: 'all .2s',
  },
  active && {
    width: 80,
    bgcolor: 'primary.main',
  },
];

export default {
  step,
};
