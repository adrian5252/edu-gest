import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Activity, UserPlus } from "lucide-react";
import { Filter } from "lucide-react";

const mockRecords = [
  { id: 1, studentCode: "A001", studentName: "Ana García López", date: "2024-09-03", description: "Llegó tarde a clase", responsible: "Prof. Díaz", status: "Amonestación verbal", points: -1 },
  { id: 2, studentCode: "A002", studentName: "Luis Martínez Pérez", date: "2024-09-05", description: "No realizó la tarea", responsible: "Prof. Gómez", status: "Amonestación verbal", points: -1 },
  { id: 3, studentCode: "A003", studentName: "Sofía Rodríguez Silva", date: "2024-09-07", description: "Ayudó a un compañero", responsible: "Prof. Ruiz", status: "Refuerzo positivo", points: 2 },
  { id: 4, studentCode: "A004", studentName: "Diego Fernández Ruiz", date: "2024-09-10", description: "Interruptó constantemente", responsible: "Prof. Díaz", status: "Amonestación verbal", points: -1 },
  { id: 5, studentCode: "A005", studentName: "Valentina Gómez Díaz", date: "2024-09-11", description: "Participó activamente en grupo", responsible: "Prof. Gómez", status: "Refuerzo positivo", points: 2 },
  { id: 6, studentCode: "A001", studentName: "Ana García López", date: "2024-09-12", description: "Respeto y colaboración", responsible: "Prof. Ruiz", status: "Refuerzo positivo", points: 1 },
];

const statusOptions = ["Todos", "Amonestación verbal", "Advertencia", "Refuerzo positivo", "Felicitación", "Otros"];

export default function Conducta() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [filtered, setFiltered] = useState(mockRecords);

  useEffect(() => {
    let results = mockRecords;
    if (search) {
      results = results.filter(
        (r) =>
          r.studentName.toLowerCase().includes(search.toLowerCase()) ||
          r.studentCode.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter !== "Todos") {
      results = results.filter((r) => r.status === statusFilter);
    }
    setFiltered(results);
  }, [search, statusFilter]);

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Conducta
            </CardTitle>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => alert("Filtrar registros")}>
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" onClick={() => alert("Registrar conducta")}>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuevo Registro
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, código o descripción..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Registro</label>
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
                <TableHead className="w-20">Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="w-16 text-center">Puntos</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.studentCode}</TableCell>
                    <TableCell>{r.studentName}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell className="max-w-40 break-all">{r.description}</TableCell>
                    <TableCell>{r.responsible}</TableCell>
                    <TableCell className="text-center font-medium">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        r.points > 0
                          ? "bg-green-100 text-green-800"
                          : r.points < 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {r.points}
                      </span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver registro">
                        <Activity className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Editar registro">
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
          <CardTitle className="text-lg font-semibold">Resumen de Conducta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-4">
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Total Registros</p>
            <p className="text-2xl font-bold">{mockRecords.length}</p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Refuerzos Positivos</p>
            <p className="text-2xl font-bold text-green-600">
              {mockRecords.filter((r) => r.points > 0).length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Amonestaciones</p>
            <p className="text-2xl font-bold text-red-600">
              {mockRecords.filter((r) => r.points < 0).length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Puntos Netos</p>
            <p className="text-2xl font-bold">
              {mockRecords.reduce((sum, r) => sum + r.points, 0)}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}