import { DataGridProps } from "@mui/x-data-grid";

export const dataGridSxStyles = (isDarkMode: boolean) => {
    return {
      backgroundColor: isDarkMode ? "#1d1f21" : "white",
color:isDarkMode?"white":"black",
      "& .MuiDataGrid-columnHeaders": {
        color: `${isDarkMode ? "#e5e7eb" : ""}`,
        '& [role="row"] > *': {
          backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
          borderColor: `${isDarkMode ? "#2d3135" : ""}`,
        },
      },
      "& .MuiIconbutton-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiTablePagination-root": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiTablePagination-selectIcon": {
        color: `${isDarkMode ? "#a3a3a3" : ""}`,
      },
      "& .MuiDataGrid-cell": {
        border: "none",
      },
      "& .MuiDataGrid-row": {
        borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
      },
      "& .MuiDataGrid-withBorderColor": {
        borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
      },
    };
  };