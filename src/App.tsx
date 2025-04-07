import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useWeather } from "./hooks/useWeather";
import { WeatherCard } from "./components/WeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const { weather, error, loading, getWeather } = useWeather();

  const handleSearch = () => {
    if (city.trim()) getWeather(city.trim());
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Weather App
      </Typography>
      <TextField
        fullWidth
        label="Enter city"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSearch}
      >
        Search
      </Button>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {weather && <WeatherCard weather={weather} />}
    </Container>
  );
};

export default App;
