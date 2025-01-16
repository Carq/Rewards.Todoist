const messages = [
  "Świetna robota! Osiągnąłeś nowy poziom!",
  "Gratulacje! Jesteś coraz lepszy!",
  "Brawo! Kolejny poziom zdobyty!",
  "Fantastycznie! Nowy poziom osiągnięty!",
  "Super! Twoje postępy są imponujące!",
  "Wspaniale! Kontynuuj dobrą pracę!",
  "Niesamowite! Nowy poziom zdobyty!",
  "Doskonała robota! Jesteś na nowym poziomie!",
  "Kapitalnie! Twoje wysiłki się opłaciły!",
  "Ekstra! Nowy poziom osiągnięty!",
];

export const getMotivationMessage = () => {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};
