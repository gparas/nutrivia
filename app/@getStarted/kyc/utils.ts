import C from './constants';

const getCurrentPathname = (pathname: string) => {
  const pathnameToArray = pathname.split('/');
  return pathnameToArray[pathnameToArray.length - 1];
};

const getNextPathname = (pathname: string) => {
  const currentItem = getCurrentPathname(pathname);
  const currentIndex = C.STEPS.indexOf(currentItem);
  const nextIndex = (currentIndex + 1) % C.STEPS.length;
  return `/kyc/${C.STEPS[nextIndex]}`;
};

export default {
  getCurrentPathname,
  getNextPathname,
};
