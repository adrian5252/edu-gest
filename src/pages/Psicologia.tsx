import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Stethoscope, UserPlus } from "lucide-react";
import { Filter } from "lucide-react";

const mockCases = [
  { id: 1, studentCode: "A001", studentName: "Ana García López", dateOpened: "2024-08-20", status: "Abierto", responsible: "Psicóloga López", notes: "Observación inicial de ansiedad leve" },
  { id: 2, studentCode: "A002", studentName: "Luis Martínez Pérez", dateOpened: "2024-09-05", status: "En seguimiento", responsible: "Psicóloga López", notes: "Refuerzo de autoestima" },
  { id: 3, studentCode: "A003", studentName: "Sofía Rodríguez Silva", dateOpened: "2024-07-15", status: "Solucionado", responsible: "Psicóloga López", notes: "Superación de miedo escolar" },
  { id: 4, studentCode: "A004", studentName: "Diego Fernández Ruiz", dateOpened: "2024-09-10", status: "Abierto", responsible: "Psicóloga López", notes: "Dificultades de concentración" },
  { id: 5, studentCode: "A005", studentName: "Valentina Gómez Díaz", dateOpened: "2024-08-30", status: "Cerrado", responsible: "Psicóloga López", notes: "Finalizado satisfactoriamente" },
];

const statusOptions = ["Todos", "Abierto", "En seguimiento", "Solucionado", "Cerrado"];

export default function Psicologia() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [filtered, setFiltered] = useState(mockCases);

  useEffect(() => {
    let results = mockCases;
    if (search) {
      results = results.filter(
        (c) =>
          c.studentName.toLowerCase().includes(search.toLowerCase()) ||
          c.studentCode.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "Todos") {
      results = results.filter((c) => c.status === statusFilter);
    }
    setFiltered(results);
  }, [search, statusFilter]);

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <Stethoscope className="mr-2 h-5 w-5" />
              Psicología
            </CardTitle>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => alert("Filtrar casos")}>
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" onClick={() => alert("Nuevo caso")}>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Caso
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o código..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Estado</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Código Estudiante</TableHead>
                <TableHead>Nombre Estudiante</TableHead>
                <TableHead className="w-20">Fecha Apertura</TableHead>
                <TableHead className="w-20">Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No se encontraron casos
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.studentCode}</TableCell>
                    <TableCell>{c.studentName}</TableCell>
                    <TableCell>{c.dateOpened}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        c.status === "Abierto"
                          ? "bg-red-100 text-red-800"
                          : c.status === "En seguimiento"
                          ? "bg-yellow-100 text-yellow-800"
                          : c.status === "Solucionado" || c.status === "Cerrado"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell>{c.responsible}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver caso">
                        <Stethoscope className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Editar caso">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Estadísticas de Casos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-4">
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Total Casos</p>
            <p className="text-2xl font-bold">{mockCases.length}</p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Abiertos</p>
            <p className="text-2xl font-bold text-red-600">
              {mockCases.filter((c) => c.status === "Abierto").length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">En Seguimiento</p>
            <p className="text-2xl font-bold text-yellow-600">
              {mockCases.filter((c) => c.status === "En seguimiento").length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Resueltos</p>
            <p className="text-2xl font-bold text-green-600">
              {mockCases.filter((c) => c.status === "Solucionado" || c.status === "Cerrado").length}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}