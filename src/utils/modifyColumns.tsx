import { useState } from 'react';

const initialColumns = new Set(['TT_COOL_ID', 'SCETA', 'SCPHI', 'LATOME_NAME']);

export const useModifyColumns = () => {
  const [columns, setColumns] = useState(initialColumns);

  const add = (str: string) => {
    setColumns((prevColumns) => new Set(prevColumns).add(str));
  };

  const remove = (str: string) => {
    setColumns((prevColumns) => {
      const newColumns = new Set(prevColumns);
      newColumns.delete(str);
      return newColumns;
    });
  };

  return { columns, add, remove };
};
