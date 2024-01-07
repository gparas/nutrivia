export const root = {
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  height: 4,
  zIndex: 0,
  borderRadius: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'currentColor',
    opacity: 0.2,
  },
};

export const progress_bar = {
  transition: 'width .4s linear',
};
