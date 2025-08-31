const flavors: {
  [key: string]: number[];
} = {
  standard: [50, 50],
  sweet: [41.66, 58.34],
  bright: [58.34, 41.66],
};

const concentrations: {
  [key: string]: number[];
} = {
  light: [100],
  medium: [50, 50],
  strong: [33.33, 33.33, 33.33],
};

export const calculatePours = ({
  water,
  flavor,
  concentration,
}: {
  water: number;
  flavor: string;
  concentration: string;
}) => {
  const flavorWater = water * 0.4;
  const concentrationWater = water - flavorWater;
  return {
    flavor: flavors[flavor].map((f) => flavorWater * (f / 100)),
    concentration: concentrations[concentration].map(
      (c) => concentrationWater * (c / 100)
    ),
  };
};

export const calculatePourGridColumns = (
  pours: {
    flavor: number[];
    concentration: number[];
  },
  water: number
): string => {
  const columns: string[] = [];
  pours.flavor.forEach((pour) => {
    columns.push((pour * 100) / water + '%');
  });
  pours.concentration.forEach((pour) => {
    columns.push((pour * 100) / water + '%');
  });
  return columns.join(' ');
};
