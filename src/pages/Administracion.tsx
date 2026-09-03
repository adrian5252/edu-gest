import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Users, Settings, UserPlus, ShieldCheck } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Administrador", email: "admin@colegio.edu", role: "admin", status: "Activo", lastLogin: "2024-09-12 08:30" },
  { id: 2, name: "Pedagogo", email: "pedagogia@colegio.edu", role: "pedagogia", status: "Activo", lastLogin: "2024-09-11 14:15" },
  { id: 3, name: "Psicólogo", email: "psicologia@colegio.edu", role: "psicologia", status: "Activo", lastLogin: "2024-09-10 09:45" },
  { id: 4, name: "Nutricionista", email: "nutricion@colegio.edu", role: "nutricion", status: "Activo", lastLogin: "2024-09-09 11:20" },
  { id: 5, name: "Trabajador Social", email: "trabajosocial@colegio.edu", role: "trabajo-social", status: "Activo", lastLogin: "2024-09-08 16:00" },
  { id: 6, name: "Personal General", email: "general@colegio.edu", role: "general", status: "Activo", lastLogin: "2024-09-07 10:05" },
];

const mockRoles = [
  { id: 1, name: "Administrador", description: "Acceso completo a todas las áreas y funciones", permissions: ["Todos"] },
  { id: 2, name: "Pedagogía", description: "Acceso a módulos académicos, calificaciones, historial académico", permissions: ["Alumnos", "Etapas", "Expedientes", "Pedagogía", "General", "Formatos"] },
  { id: 3, name: "Psicología", description: "Acceso a módulos psicológicos, casos, seguimientos", permissions: ["Psicología", "Expedientes", "General", "Formatos"] },
  { id: 4, name: "Nutrición", description: "Acceso a módulos nutricionales, planes, seguimientos", permissions: ["Nutrición", "Expedientes", "General", "Formatos"] },
  { id: 5, name: "Trabajo Social", description: "Acceso a módulos de trabajo social, intervenciones, seguimientos", permissions: ["Trabajo Social", "Expedientes", "General", "Formatos"] },
  { id: 6, name: "General", description: "Acceso a información general y reportes básicos", permissions: ["General", "Formatos", "Expedientes (solo vista)"] },
];

export default function Administracion() {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [activeTab, setActiveTab] = useState("usuarios");

  useEffect(() => {
    const results = mockUsers.filter(
      (u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(results);
  }, [search]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-5 w-5" />
            <span>Administración</span>
          </div>
          <Button variant="outline" onClick={() => alert("Agregar nuevo usuario")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="usuarios" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-[200px_1fr]">
            <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
            <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios">
            <div className="space-y-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email o rol..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="w-20">Rol</TableHead>
                    <TableHead className="w-20">Estado</TableHead>
                    <TableHead className="w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        No se encontraron usuarios
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.name}</TableCell>
                        <TableCell>{u.email}</TableCell>
                        <TableCell>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            u.role === "admin"
                              ? "bg-primary/10 text-primary"
                              : u.role === "pedagogia"
                              ? "bg-green-100 text-green-800"
                              : u.role === "psicologia"
                              ? "bg-red-100 text-red-800"
                              : u.role === "nutricion"
                              ? "bg-yellow-100 text-yellow-800"
                              : u.role === "trabajo-social"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {u.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            u.status === "Activo"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {u.status}
                          </span>
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver usuario">
                            <Users className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Editar usuario">
                            <UserPlus className="h-4 w-4 text-warning" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Nombre del Rol</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="w-40">Permisos</TableHead>
                    <TableHead className="w-24">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRoles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-gray-500">
                        No se encontraron roles
                      </TableCell>
                    </TableRow>
                  ) : (
                    mockRoles.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>{r.name}</TableCell>
                        <TableCell className="max-w-40 break-all">{r.description}</TableCell>
                        <TableCell className="max-w-40 break-all text-sm">
                          {r.permissions.map((p) => (
                            <span key={p} className="inline-block bg-gray-200 text-xs px-2 py-1 mr-1 mb-1 rounded">
                              {p}
                            </span>
                          ))}
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="ghost" size="icon" aria-label="Ver rol">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Editar rol">
                            <UserPlus className="h-4 w-4 text-warning" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}