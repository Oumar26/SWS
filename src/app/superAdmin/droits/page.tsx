'use client'
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { db } from "@/app/firebase/firebase";
import { Tag } from 'primereact/tag';
import { Users } from '@/app/hooks/Users';
import {collection, query, where, getDocs, getDoc, doc, setDoc, deleteDoc} from 'firebase/firestore'


export default function Page() {
    const [customers, setCustomers] = useState([]);
    const { getUsers } = Users();
    const [filters, setFilters] = useState({
        global: { value: null,matchMode: FilterMatchMode.CONTAINS  },
        email : {value:null, matchMode: FilterMatchMode.STARTS_WITH},
        nom: { value: null , matchMode: FilterMatchMode.STARTS_WITH},
        prenom: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        statut: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [statuses] = useState(['0', '1', '2']);


    const getSeverity = (status) => {
      switch (status) {
          case '0':
              return 'danger';
  
          case '1':
              return 'info';
          
          case '2':
            return 'success';
    
      }
  };

  const statusItemTemplate = (option) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    useEffect(() => {
        getUsers().then((data) => {
            setCustomers(data);
            setLoading(false);
        });
    }, []); 

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Recherche globale" />
                </span>
            </div>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.statut} />;
    };

    const statusRowFilterTemplate = (options) => {
      return (
          <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Choisir un" className="p-column-filter" showClear style={{ minWidth: '12rem' }} />
      );
  };

  const editButtonTemplate = (rowData) => {
    return <i className="pi pi-pencil" style={{ cursor: 'pointer' }} onClick={() => handleEdit(rowData)}></i>;
  };

  const DeleteButtonTemplate = (rowData) => {
    return <i className="pi pi-delete-left" style={{ cursor: 'pointer' }} onClick={() => handleDelete(rowData)}></i>;
  }

  const handleDelete = async (rowData) => {
    
    try {
      const q = query(collection(db,'users'), where("id", "==", rowData.id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const userDocRef = doc.ref;
        // Supprimer le document
        await deleteDoc(userDocRef);
    });
      
      alert('Suppression réussie !');
    } catch (error) {
      console.error(error);
      alert('Une erreur s\'est produite lors de la suppression de l\'utilisateur.');
    }


};

    const header = renderHeader();

  //editer une ligne  
  const handleEdit = (rowData) => {
      console.log('Éditer la ligne : ', rowData);

  };

  const statusEditor = (rowData, { rowIndex }) => {
    return (
        <Dropdown
            value={rowData.statut}
            options={statuses}
            onChange={(e) => handleStatusChange(e.value, rowData)}
            placeholder="Choisir un"
            style={{ width: '100%' }}
        />
    );
  }; 

  const handleStatusChange = (newStatus, rowData) => {
    if (rowData && rowData.statut !== undefined) {
        // Assurez-vous que rowData.statut est défini
        console.log('Nouveau statut : ', newStatus);
        console.log('Ligne modifiée : ', rowData);
        // Mettez à jour le statut dans la base de données
    } else {
        console.error('Erreur : rowData ou rowData.statut est undefined.');
    }
};


    return (
        <div className="card">
            <DataTable value={customers} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row" loading={loading}
                    globalFilterFields={['email','nom', 'prenom', 'statut']} header={header} emptyMessage="Utilisateur introuvable.">
                <Column field="email" header="Email" filter filterPlaceholder="Recherche par email" style={{ minWidth: '12rem' }} />
                <Column field="nom" header="Nom" filter filterPlaceholder="Recherche par nom" style={{ minWidth: '12rem' }} />
                <Column field="prenom" header="Prénom" style={{ minWidth: '12rem' }} filter filterPlaceholder="Recherche par prénom" />
                <Column field="statut" header="Statut" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate}   />
                <Column headerStyle={{ width: '3rem' }} body={editButtonTemplate} />
                <Column headerStyle={{ width: '3rem' }} body={DeleteButtonTemplate} />

            </DataTable>
        </div>
    );
}
