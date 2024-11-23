import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("renders all fields correctly", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn(); // Mock de onSuccess
      render(<Form onSuccess={onSuccess} />);

      // Simule un clic sur le bouton de soumission
      fireEvent.click(await screen.findByTestId("button-test-id"));

      // Attendre que l'état "En cours" apparaisse
      await screen.findByText("En cours");

      // Vérifie que le texte du bouton revient à "Envoyer" après envoi
      await screen.findByText("Envoyer");

      // Vérifie que onSuccess a été appelé
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
