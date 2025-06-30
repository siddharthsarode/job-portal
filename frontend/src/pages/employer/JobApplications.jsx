import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import useAuth from "../../hooks/useAuth";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

const JobApplications = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL}/jobPost/applicants/${user.id}`,
          { method: "GET", credentials: "include" }
        );
        const result = await res.json();

        if (!res.ok) throw new Error(result.message || "not found application");
        setRowData(result.data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, []);

  if (loading) return <div>Loading...</div>;

  const columnDefs = [
    { headerName: "Job Title", field: "jobPostId.title" },
    { headerName: "Position", field: "jobPostId.position" },
    { headerName: "Location", field: "jobPostId.location" },
    { headerName: "Job Type", field: "jobPostId.jobType" },
    { headerName: "Candidate", field: "candidateId.username" },
    { headerName: "Email", field: "candidateId.email" },
    { headerName: "Mobile", field: "candidateId.mobile" },
    {
      headerName: "Resume",
      field: "resumeUrl",
      cellRenderer: (params) => (
        <a target="_blank" href={`${params.data.resumeUrl}`}>
          View Resume
        </a>
      ),
    },
    { headerName: "Status", field: "status" },
    {
      headerName: "Applied At",
      field: "appliedAt",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];
  return (
    <div>
      {rowData.length === 0 ? (
        <div>No data found</div>
      ) : (
        <div className="w-full h-[30rem]">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            pagination={true}
            paginationPageSize={5}
          />
        </div>
      )}
    </div>
  );
};

export default JobApplications;
