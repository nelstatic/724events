import { render, screen } from "@testing-library/react";
import { useData } from "../../contexts/DataContext"; // Import de la fonction réelle
import Events from "./index";

// Mock direct de `useData`
jest.mock("../../contexts/DataContext", () => ({
  useData: jest.fn(),
}));

describe("When Events is created", () => {
  it("displays an error message when there is an error", async () => {
    // Simulation pour ce test spécifique
    useData.mockReturnValue({
      data: null,
      error: new Error("Failed to load data"),
      loading: false,
    });

    render(<Events />);

    expect(await screen.findByText("An error occured")).toBeInTheDocument();
  });

  it("displays events when data is loaded", async () => {
    useData.mockReturnValue({
      data: {
        events: [
          {
            id: 1,
            title: "Conférence #productCON",
            description: "Présentation des outils analytics.",
          },
        ],
      },
      error: null,
      loading: false,
    });

    render(<Events />);

    expect(
      await screen.findByText("Conférence #productCON")
    ).toBeInTheDocument();
  });

  it("shows a loading message when loading", () => {
    useData.mockReturnValue({
      data: null,
      error: null,
      loading: true,
    });

    render(<Events />);

    expect(screen.getByText("loading")).toBeInTheDocument();
  });
});
