import { useState, useMemo } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Type sélectionné pour le filtre
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  // Liste des types
  const typeList = useMemo(
    () => [...new Set(data?.events.map((event) => event.type))],
    [data]
  );

  // Filtrage et pagination combinés
  const filteredEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;

    return (data?.events || [])
      .filter((event) => !type || event.type === type) // Applique le filtre par type
      .slice(startIndex, endIndex); // Applique la pagination
  }, [data, type, currentPage]);

  // Nombre total de pages
  const pageNumber = useMemo(() => {
    const totalEvents = (data?.events || []).filter(
      (event) => !type || event.type === type
    ).length;

    return Math.ceil(totalEvents / PER_PAGE);
  }, [data, type]);

  return (
    <>
      {error && <div>An error occured</div>}
      {!data ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => {
              setType(value === "Toutes" ? null : value);
              setCurrentPage(1); // Réinitialise à la première page lors d'un changement de filtre
            }}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, index) => {
              const page = index + 1; // Numéro de la page
              return (
                <a
                  key={`page-${page}-${Math.random()}`} // Génère une clé unique en combinant le numéro de page et un identifiant aléatoire
                  href="#events"
                  className={page === currentPage ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
