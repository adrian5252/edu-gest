import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { HandHeart, UserPlus } from "lucide-react";
import { Filter } from "lucide-react";

const mockInterventions = [
  { id: 1, studentCode: "A001", studentName: "Ana García López", date: "2024-08-15", type: "Visita domiciliaria", description: "Entrevista con padres sobre hábitos de estudio", responsible: "Asistente Social Gómez", followUp: "Programar taller de estudio" },
  { id: 2, studentCode: "A002", studentName: "Luis Martínez Pérez", date: "2024-09-05", type: "Reunión familiar", description: "Dialogo sobre cambios de comportamiento", responsible: "Asistente Social Gómez", followUp: "Seguimiento en 2 semanas" },
  { id: 3, studentCode: "A003", studentName: "Sofía Rodríguez Silva", date: "2024-07-20", type: "Taller grupal", description: "Taller de habilidades sociales para 5to básico", responsible: "Asistente Social Gómez", followUp: "Evaluar impacto" },
  { id: 4, studentCode: "A004", studentName: "Diego Fernández Ruiz", date: "2024-09-10", type: "Derivación externa", description: "Derivación a centro de salud mental", responsible: "Asistente Social Gómez", followUp: "Esperar informe externo" },
  { id: 5, studentCode: "A005", studentName: "Valentina Gómez Díaz", date: "2024-08-30", type: "Apoyo económico", description: "Gestión de beca de útiles escolares", responsible: "Asistente Social Gómez", followUp: "Confirmar recepción" },
];

const typeOptions = ["Todos", "Visita domiciliaria", "Reunión familiar", "Taller grupal", "Derivación externa", "Apoyo económico", "Otros"];

export default function TrabajoSocial() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [filtered, setFiltered] = useState(mockInterventions);

  useEffect(() => {
    let results = mockInterventions;
    if (search) {
      results = results.filter(
        (i) =>
          i.studentName.toLowerCase().includes(search.toLowerCase()) ||
          i.studentCode.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (typeFilter !== "Todos") {
      results = results.filter((i) => i.type === typeFilter);
    }
    setFiltered(results);
  }, [search, typeFilter]);

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <HandHeart className="mr-2 h-5 w-5" />
              Trabajo Social
            </CardTitle>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => alert("Filtrar intervenciones")}>
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" onClick={() => alert("Nueva intervención")}>
                <UserPlus className="mr-2 h-4 w-4" />
                Nueva Intervención
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
              <label className="block text-sm font-medium mb-2">Tipo de Intervención</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                {typeOptions.map((opt) => (
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
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No se encontraron intervenciones
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((i) => (
                  <TableRow key={i.id}>
                    <TableCell>{i.studentCode}</TableCell>
                    <TableCell>{i.studentName}</TableCell>
                    <TableCell>{i.date}</TableCell>
                    <TableCell>{i.type}</TableCell>
                    <TableCell className="max-w-40 break-all">{i.description}</TableCell>
                    <TableCell>{i.responsible}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver intervención">
                        <HandHeart className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Editar intervención">
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
          <CardTitle className="text-lg font-semibold">Estadísticas de Intervenciones</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-4">
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Total Intervenciones</p>
            <p className="text-2xl font-bold">{mockInterventions.length}</p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Visitas Domiciliarias</p>
            <p className="text-2xl font-bold">
              {mockInterventions.filter((i) => i.type === "Visita domiciliaria").length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Reuniones Familiares</p>
            <p className="text-2xl font-bold">
              {mockInterventions.filter((i) => i.type === "Reunión familiar").length}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Talleres Grupales</p>
            <p className="text-2xl font-bold">
              {mockInterventions.filter((i) => i.type === "Taller grupal").length}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}