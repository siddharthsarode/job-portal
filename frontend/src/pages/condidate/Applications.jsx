import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useMemo } from "react";
ModuleRegistry.registerModules([AllCommunityModule]);

const Applications = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log(rowData);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL}/jobPost/apply/${user.id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "No application found");
        setRowData(result.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Title",
        field: "jobPostId.title",
        sortable: true,
        filter: true,
      },
      { headerName: "Position", field: "jobPostId.position", sortable: true },
      { headerName: "Location", field: "jobPostId.location", sortable: true },
      { headerName: "Job Type", field: "jobPostId.jobType" },
      { headerName: "Status", field: "status", cellClass: "status-cell" },
      {
        headerName: "Applied At",
        field: "appliedAt",
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
      },
    ],
    []
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-primary font-bold text-2xl mb-7">My Applications</h1>
      {rowData.length == 0 ? (
        <div>No applications found</div>
      ) : loading ? (
        <div>Loading...</div>
      ) : (
        <div className="h-[30rem] w-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={5}
            defaultColDef={{ filter: true }}
          />
        </div>
      )}
    </div>
  );
};

export default Applications;
