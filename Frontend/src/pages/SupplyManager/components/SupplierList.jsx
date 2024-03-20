import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
} from '@mui/x-data-grid';

const initialRows = [];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/supply-management/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: ' ',
          contact: { phone: '', email: '', address: '' },
          productsSupplied: [],
          paymentTerms: '',
          notes: ''
        }),
      });
      if (response.ok) {
        const newSupplier = await response.json();

        newSupplier.id = newSupplier._id;

        const productsSuppliedString = '';

        setRows((oldRows) => [...oldRows, { ...newSupplier, productsSuppliedString }]);

        setRowModesModel((oldModel) => ({
          ...oldModel,
          [newSupplier.id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
      } else {
        console.error('Failed to add supplier');
      }
    } catch (error) {
      console.error('Error adding supplier:', error);
    }
  };

  return (
    <GridToolbarContainer sx={{ width: 180, height: 50 }}>
      <Button
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
        startIcon={<AddIcon />} onClick={handleClick} >
        Add Supplier
      </Button>
    </GridToolbarContainer>
  );
}

export default function SupplierList() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
      
      const updatedRow = { ...params.props.row }; // Get the updated row data
      const updatedRows = rows.map((row) =>
        row.id === updatedRow.id ? updatedRow : row
      );
      setRows(updatedRows);
    }
  };
  

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    try {
      const updatedRow = rows.find((row) => row.id === id);

      if (!updatedRow) {
        console.error('No changes found for the row.');
        return;
      }

      updatedRow.productsSupplied = transformProductsSupplied(updatedRow.productsSupplied);


      const response = await fetch(`http://localhost:8000/supply-management/suppliers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRow),
      });
      if (response.ok) {
        const updatedSupplier = await response.json();
        updatedSupplier.id = updatedSupplier._id;
        setRows(rows.map((row) => (row.id === id ? updatedSupplier : row)));
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      const response = await fetch(`http://localhost:8000/supply-management/suppliers/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRows(rows.filter((row) => row.id !== id));
      } else {
        console.error('Failed to delete supplier');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const transformProductsSupplied = (productsSupplied) => {
  if (Array.isArray(productsSupplied)) {
    // If productsSupplied is already an array, return it directly
    return productsSupplied;
  } else if (typeof productsSupplied === 'string') {
    // If productsSupplied is a string, split it and transform it into an array
    return productsSupplied.split(', ').map((productString) => {
      const [name, category] = productString.split(' (');
     const formattedCategory = category ? category.substring(0, category.length - 1) : '';
      return { name, category: formattedCategory };
    });
  } else {
    // Handle other cases, such as undefined or unexpected types
    console.error('Invalid productsSupplied format:', productsSupplied);
    return [];
  }
};

  

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'contact.phone', headerName: 'Phone', width: 180, editable: true },
    { field: 'contact.email', headerName: 'Email', width: 180, editable: true },
    { field: 'contact.address', headerName: 'Address', width: 250, editable: true },
    { field: 'productsSupplied', headerName: 'Products Supplied', width: 250, editable: true },
    { field: 'paymentTerms', headerName: 'Payment Terms', width: 150, editable: true },
    { field: 'notes', headerName: 'Notes', width: 250, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main', width: 50, height: 50 }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem sx={{ width: 50, height: 50 }}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem sx={{ width: 50, height: 50 }}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem sx={{ width: 50, height: 50 }}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/supply-management/suppliers");
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map(supplier => ({
            id: supplier._id,
            name: supplier.name,
            contact: {
              phone: supplier.contact.phone,
              email: supplier.contact.email,
              address: supplier.contact.address,
            },
            productsSupplied: supplier.productsSupplied.map(product => `${product.name} (${product.category})`).join(', '),
            paymentTerms: supplier.paymentTerms,
            notes: supplier.notes
          }));
          setRows(transformedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        marginTop: 10,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}

