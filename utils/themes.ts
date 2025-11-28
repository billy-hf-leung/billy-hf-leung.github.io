export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    bg: string;
    surface: string;
    text: string;
    border: string;
  };
}

export const THEMES: Theme[] = [
  {
    id: 'soft-sky',
    name: 'Soft Sky',
    colors: {
      primary: '#7EC8E3',   // Sky Blue Soft
      secondary: '#A9D6E5', // Pale Ice Blue
      accent: '#508CA4',    // Muted Ocean Blue
      bg: '#F0F9FF',        // Ultra Soft Blue
      surface: '#E3EEF5',   // Light Mist Blue
      text: '#2A3A44',      // Blue-Grey Text
      border: '#8FA6B2',    // Muted Grey-Blue Border
    }
  },
  {
    id: 'soft-mint',
    name: 'Soft Mint',
    colors: {
      primary: '#BFEDE6',   // Soft Mint
      secondary: '#91C7C1', // Muted Aqua
      accent: '#6DA3A0',    // Cool Teal Grey
      bg: '#F4FBFA',        // Mint Whisper
      surface: '#E1EFEF',   // Pale Grey-Teal
      text: '#2E3F3F',      // Deep Cool Grey
      border: '#4F6F6E',    // Blue-Green Grey
    }
  },
  {
    id: 'muted-teal',
    name: 'Muted Teal',
    colors: {
      primary: '#7BB5BD',   // Soft Teal Blue
      secondary: '#A9C6CF', // Dusty Light Blue
      accent: '#5F7C89',    // Muted Slate Blue
      bg: '#F2F7F8',        // Frost Blue
      surface: '#E4EBED',   // Fog Grey-Blue
      text: '#243238',      // Dark Slate
      border: '#4D5E65',    // Cool Neutral Grey
    }
  },
  {
    id: 'minimal-grey',
    name: 'Minimal Grey',
    colors: {
      primary: '#9DB7C4',   // Pastel Blue Grey
      secondary: '#C8D7DF', // Soft Silver Blue
      accent: '#55626B',    // Neutral Soft Grey (used as Accent)
      bg: '#F7FAFC',        // Cloud White Blue
      surface: '#EDF2F5',   // Very Light Blue Grey
      text: '#1F2A32',      // Dark Matte Blue
      border: '#B0C4D0',    // (Derived) Slightly Darker Silver Blue
    }
  }
];