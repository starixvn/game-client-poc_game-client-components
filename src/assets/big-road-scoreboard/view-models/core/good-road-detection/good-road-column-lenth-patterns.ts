export const LONG_ROAD = { columns: [{ exact: false, length: 4 }], repeat: 0 };

export const ADJACENT_TWO_COLUMNS = {
  columns: [
    { exact: false, length: 2 },
    { exact: false, length: 2 },
  ],
  repeat: 0,
};

export const CHASE = {
  columns: [
    { exact: true, length: 1 },
    { exact: true, length: 1 },
    { exact: true, length: 1 },
    { exact: true, length: 1 },
  ],
  repeat: 50,
};

export const ONE_HOME_TWO_ROOMS = {
  columns: [
    { exact: true, length: 2 },
    { exact: true, length: 1 },
    { exact: true, length: 2 },
    { exact: true, length: 1 },
  ],
  repeat: 0,
};

export const SEPARATED = {
  columns: [
    { exact: false, length: 2 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
    { exact: false, length: 1 },
    { exact: false, length: 2 },
    { exact: false, length: 1 },
    { exact: true, length: 1 },
  ],
  repeat: 0,
};

export const SYMMETRICAL_PATTERNS = [SEPARATED, LONG_ROAD, ADJACENT_TWO_COLUMNS, CHASE, ONE_HOME_TWO_ROOMS];
