/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// WeatherApp.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Weather App", () => {
  const mockWeather = {
    data: {
      name: "London",
      main: { temp: 15 },
      weather: [{ description: "clear sky", icon: "01d" }],
    },
  };

  it("shows weather data correctly", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockWeather);

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
    mockedAxios.get.mockRejectedValueOnce(new Error("City not found"));

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
