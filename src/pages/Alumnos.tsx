import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Users, UserPlus } from "lucide-react";

const mockStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A", status: "Activo" },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "2do", section: "B", status: "Activo" },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "3ro", section: "A", status: "Activo" },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C", status: "Inactivo" },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "2do", section: "A", status: "Activo" },
];

export default function Alumnos() {
  const [search, setSearch] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const results = mockStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.grade.toLowerCase().includes(search.toLowerCase()) ||
        s.section.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredStudents(results);
  }, [search]);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleClose = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold">Gestión de Alumnos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por código, nombre, grado o sección..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={handleAdd}>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Alumno
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-16">Grado</TableHead>
                <TableHead className="w-16">Sección</TableHead>
                <TableHead className="w-20">Estado</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No se encontraron alumnos
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.code}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        student.status === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver expediente">
                        <Users className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Editar">
                        <UserPlus className="h-4 w-4 text-warning" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Student Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Registrar Nuevo Alumno</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Cerrar</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Código del Alumno *</label>
                  <Input placeholder="Ej: A006" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                  <Input placeholder="Ej: Carlos Méndez Torres" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Fecha de Nacimiento</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Grado *</label>
                  <Input placeholder="Ej: 1ro, 2do, 3ro..." required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Sección *</label>
                  <Input placeholder="Ej: A, B, C..." required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Colegio</label>
                  <Input placeholder="Nombre del colegio" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Etapa</label>
                  <Input placeholder="Ej: Etapa Cognitiva, Etapa II" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estado del Alumno</label>
                  <Input placeholder="Activo, Inactivo, Traslado..." />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono de Contacto</label>
                  <Input type="tel" placeholder="Ej: +56 9 1234 5678" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
                  <Input type="email" placeholder="ejemplo@email.com" />
                </div>
              </div>
            </form>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleClose}>
                Guardar Alumno
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}