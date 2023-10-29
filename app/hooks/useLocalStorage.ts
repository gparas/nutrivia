const useLocalStorage = (namespace: string) => {
  const loadUserState = () => localStorage.getItem(namespace);

  const loadState = () => {
    try {
      const serializedState = loadUserState();
      return serializedState === null ? {} : JSON.parse(serializedState);
    } catch (err) {
      console.error(err);
      return {};
    }
  };
  const saveState = (state: object) => {
    try {
      const currentState = loadState();
      const serializedState = { ...currentState, ...state };
      localStorage.setItem(`${namespace}`, JSON.stringify(serializedState));
    } catch (err) {
      console.error(err);
    }
  };
  return {
    loadState,
    saveState,
  };
};

export default useLocalStorage;
