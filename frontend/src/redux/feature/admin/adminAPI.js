import api from "../../../services/axios";

export const getDashboardStatsAPI = () =>
    api.get("/admin/dashboard");

export const getPendingDoctorsAPI = () =>
    api.get("/admin/doctors/pending");

export const approveDoctorAPI = (doctorId) =>
    api.patch(`/admin/doctors/${doctorId}/approve`);

export const rejectDoctorAPI = (doctorId) =>
    api.patch(`/admin/doctors/${doctorId}/reject`);

export const getAllDoctorsAPI = (params) =>
    api.get("/admin/doctors", { params });

export const getAllUsersAPI = (params) =>
    api.get("/admin/users", { params });

export const blockUserAPI = (userId) =>
    api.patch(`/admin/users/${userId}/block`);

export const unblockUserAPI = (userId) =>
    api.patch(`/admin/users/${userId}/unblock`);