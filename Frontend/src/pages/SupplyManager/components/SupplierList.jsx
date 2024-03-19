import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function SupplierList() {
  const url = "http://localhost:8000/supply-management/suppliers"; 
  const [data, setData] = useState([]);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        // Map over the response and transform each supplier object
        const dataWithDetails = resp.map(supplier => ({
          id: supplier._id, // Assuming _id is the unique identifier for each supplier
          name: supplier.name,
          phone: supplier.contact.phone,
          email: supplier.contact.email,
          address: supplier.contact.address,
          productsSupplied: supplier.productsSupplied.map(product => `${product.name} (${product.category})`).join(', '), // Combine product names and categories
          paymentTerms: supplier.paymentTerms,
          notes: supplier.notes
        }));
        setData(dataWithDetails);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  };
  
  

  const handleRowUpdate = async (newData, oldData) => {
    console.log('bla', newData, oldData)
    try {
      const response = await fetch(`${url}/${oldData.id}`, {
        method: "PATCH",
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify(newData)
      });
      if (!response.ok) {
        throw new Error('Failed to update supplier');
      }
      getSuppliers();
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleRowDelete = async (oldData) => {
    try {
      const response = await fetch(`${url}/${oldData.id}`, {
        method: "DELETE",
        headers: { 'Content-type': "application/json" }
      });
      if (!response.ok) {
        throw new Error('Failed to delete supplier');
      }
      getSuppliers();
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', editable: true, width:150 },
    { field: 'phone', headerName: 'Contact Phone', editable: true, width:150 },
    { field: 'email', headerName: 'Contact Email', editable: true, width:150 },
    { field: 'address', headerName: 'Address', editable: true, width:250},
    { field: 'productsSupplied', headerName: 'Products Supplied', editable: true, width:250 },
    { field: 'paymentTerms', headerName: 'Payment Terms', editable: true, width:150 },
    { field: 'notes', headerName: 'Notes', editable: true, width:450 }
  ];

  return (
    <div style={{ height: 500, maxWidth: '100%', width: '100%', marginTop: 64 }}>
      <DataGrid
        rows={data}
        columns={columns.map(column => ({
          ...column,
          editable: column.editable ? 'onUpdate' : undefined
        }))}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        editable={{
          onRowUpdate: handleRowUpdate,
          onRowDelete: handleRowDelete
        }}
      />
    </div>
  );
}

export default SupplierList;
