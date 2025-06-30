import React, { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

ModuleRegistry.registerModules([AllCommunityModule]);

const JobPostsList = () => {
  const [rowData, setRowData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const url = import.meta.env.VITE_APP_BASE_URL;
  const { user } = useAuth();

  useEffect(() => {
    const getJobPosts = async () => {
      try {
        const res = await fetch(`${url}/jobPost/${user.id}`, {
          method: "GET",
          credentials: "include",
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.message || "NO job posts found");
        setRowData(result.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    getJobPosts();
  }, []);

  // Delete the job post
  const handleDelete = async () => {
    const backupData = [...rowData];
    setRowData((prev) => prev.filter((item) => item._id !== deleteId));
    setDeleteId(null);

    try {
      const res = await fetch(`${url}/jobPost/${deleteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Delete failed");

      toast.success(result.message || "Job post deleted successfully");
    } catch (err) {
      console.error(err);
      toast.log(err.message || "Failed to delete job post.");
      setRowData(backupData);
    }
  };

  const handleEditSave = async () => {
    const backupData = [...rowData];
    setRowData((prev) =>
      prev.map((item) => (item._id === editData._id ? editData : item))
    );
    setEditData(null);
    const {
      title,
      description,
      position,
      employerId,
      location,
      jobType,
      experienceLevel,
      isActive,
    } = editData;

    try {
      const res = await fetch(`${url}/jobPost/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          position,
          employerId: employerId._id,
          location,
          jobType,
          experienceLevel,
          isActive,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      toast.success(result.message || "Job post updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update job post.");
      setRowData(backupData);
    }
  };

  const columnDefs = useMemo(
    () => [
      { headerName: "Title", field: "title", width: 180 },
      { headerName: "Description", field: "description", width: 250 },
      { headerName: "Position", field: "position", width: 200 },
      { headerName: "Location", field: "location", width: 150 },
      { headerName: "Job Type", field: "jobType", width: 150 },
      { headerName: "Experience", field: "experienceLevel", width: 150 },
      {
        headerName: "Status",
        field: "isActive",
        width: 100,
        cellRenderer: (params) => (params.value ? "✅ Active" : "❌ Inactive"),
      },
      {
        headerName: "Actions",
        field: "actions",
        width: 150,
        filter: false,
        cellRenderer: (params) => (
          <div className="flex gap-2 items-center h-full">
            <button
              className="text-blue-600"
              onClick={() => setEditData(params.data)}
            >
              <FaEdit size={20} />
            </button>
            <button
              className="text-red-600"
              onClick={() => setDeleteId(params.data._id)}
            >
              <FaTrashAlt size={20} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {rowData?.length === 0 ? (
        <h1 className="text-2xl font-bold text-primary mb-6">No posts found</h1>
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-primary mb-6">
            You posted jobs
          </h1>
          <div className="h-[30rem] w-full">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={5}
              defaultColDef={{ filter: true, resizable: true }}
            />
          </div>

          {/* Delete Modal */}
          {deleteId !== null && (
            <div className="fixed inset-0 bg-light/50 backdrop-blur-[1px] bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-md w-[90%] max-w-md">
                <h2 className="text-xl font-semibold text-red-600 mb-2">
                  Confirm Deletion
                </h2>
                <p className="mb-4">
                  Are you sure you want to delete this job post?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editData && (
            <div className="fixed inset-0 bg-light/50 backdrop-blur-[1px] bg-opacity-40 z-50 flex items-center justify-center overflow-y-auto">
              <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-lg">
                <h2 className="text-xl font-bold mb-4 text-blue-600">
                  Edit Job Post
                </h2>
                {[
                  "title",
                  "description",
                  "position",
                  "location",
                  // "jobType",
                  // "experienceLevel",
                ].map((field) => (
                  <div key={field} className="mb-3">
                    <label className="block mb-1 capitalize font-medium">
                      {field}
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      value={editData[field]}
                      onChange={(e) =>
                        setEditData({ ...editData, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
                <div className="mb-3">
                  <label className="block mb-1 capitalize font-medium">
                    Job Type
                  </label>
                  <select
                    required
                    value={editData.jobType}
                    onChange={(e) =>
                      setEditData({ ...editData, jobType: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select job type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="internship">Internship</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 capitalize font-medium">
                    Experience Level
                  </label>
                  <select
                    value={editData.experienceLevel}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        experienceLevel: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select experience level</option>
                    <option value="fresher">Fresher</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead</option>
                    <option value="any">Any</option>
                  </select>
                </div>

                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.isActive}
                    onChange={(e) =>
                      setEditData({ ...editData, isActive: e.target.checked })
                    }
                  />
                  <label>Active</label>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setEditData(null)}
                    className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleEditSave}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default JobPostsList;
