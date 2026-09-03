import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Layout = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              EduGest
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </header>
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};