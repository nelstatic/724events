import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    // Simule un délai pour tester l'interface
    await new Promise((resolve) => {
      setTimeout(resolve, 500); // Pas de return ici
    });
    const response = await fetch("/events.json");
    if (!response.ok) throw new Error("Failed to load data");
    return response.json();
  },
};

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      setError(null); // Réinitialise les erreurs avant un nouvel appel
      setLoading(true);
      const loadedData = await api.loadData();
      setData(loadedData);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const reloadData = useCallback(() => {
    setData(null); // Réinitialise les données pour forcer un rechargement
  }, []);

  useEffect(() => {
    if (!data) getData();
  }, [data, getData]);

  // Stabilisation de la valeur du contexte avec useMemo
  const contextValue = useMemo(
    () => ({
      data,
      error,
      loading,
      reloadData, // Ajout de la fonction pour recharger
    }),
    [data, error, loading, reloadData]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
