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

const initialRows = []; // Initialize with empty array, will be populated with fetched data

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Math.random().toString();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', contact: {}, productsSupplied: '', paymentTerms: '', notes: '', isNew: true }
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer sx={{width:180, height: 50}}>
      <Button 
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the background color when hovering
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
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'contactphone', headerName: 'Phone', width: 180, editable: true },
    { field: 'contactemail', headerName: 'Email', width: 180, editable: true },
    { field: 'contactaddress', headerName: 'Address', width: 250, editable: true },
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
              sx={{ color: 'primary.main', width:50, height: 50 }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem sx={{width:50, height: 50}}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem sx={{width:50, height: 50}}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem sx={{width:50, height: 50}}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // Fetch data from the backend when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/supply-management/suppliers");
        if (response.ok) {
          const data = await response.json();
          // Transform fetched data into the format expected by the grid
          const transformedData = data.map(supplier => ({
            id: supplier._id,
            name: supplier.name,
            contactphone: supplier.contact.phone,
            contactemail: supplier.contact.email,
            contactaddress: supplier.contact.address,
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
  }, []); // Ensure this effect runs only once, similar to componentDidMount

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
        marginTop:10,
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

