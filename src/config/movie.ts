interface MovieConfig {
  rating: {
    min: number;
    max: number;
  };
}

export default {
  rating: {
    min: 1,
    max: 4,
  },
} as MovieConfig;
