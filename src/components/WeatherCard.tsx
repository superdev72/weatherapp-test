import { Card, CardContent, Typography } from "@mui/material";

interface IWeatherCardProps {
  weather: {
    city: string;
    temperature: number;
    description: string;
    icon: string;
    updatedAt: string;
  };
}

export const WeatherCard = ({ weather }: IWeatherCardProps) => (
  <Card sx={{ mt: 2 }}>
    <CardContent>
      <Typography variant="h5">{weather.city}</Typography>
      <Typography variant="h6">{weather.temperature} °C</Typography>
      <Typography>{weather.description}</Typography>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
      />
      <Typography variant="caption">
        Last updated: {new Date(weather.updatedAt).toLocaleTimeString()}
      </Typography>
    </CardContent>
  </Card>
);
