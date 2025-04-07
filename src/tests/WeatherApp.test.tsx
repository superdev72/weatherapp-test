/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import * as weatherService from "../services/weatherService";

jest.mock("../services/weatherService");

describe("Weather App", () => {
  const mockWeather = {
    city: "London",
    temperature: 15,
    description: "clear sky",
    icon: "01d",
    updatedAt: new Date().toISOString(),
  };

  it("shows weather data correctly", async () => {
    (weatherService.fetchWeather as jest.Mock).mockResolvedValue(mockWeather);
    render(<App />);

    fireEvent.change(screen.getByLabelText(/enter city/i), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/London/)).toBeInTheDocument();
      expect(screen.getByText(/15 °C/)).toBeInTheDocument();
      expect(screen.getByText(/clear sky/)).toBeInTheDocument();
    });
  });

  it("shows error for invalid city", async () => {
    (weatherService.fetchWeather as jest.Mock).mockRejectedValue(
      new Error("Not found")
    );
    render(<App />);

    fireEvent.change(screen.getByLabelText(/enter city/i), {
      target: { value: "InvalidCity" },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/city not found/i)).toBeInTheDocument();
    });
  });
});
