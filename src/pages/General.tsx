import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ClipboardList, UserPlus } from "lucide-react";

const mockRecords = [
  { id: 1, studentCode: "A001", studentName: "Ana García López", date: "2024-09-01", area: "Biblioteca", description: "Préstamo de libro: 'El Principito'", responsible: "Bibliotecaria" },
  { id: 2, studentCode: "A002", studentName: "Luis Martínez Pérez", date: "2024-09-03", area: "Comedor", description: "Participó en día de fruta", responsible: "Encargado de Comedor" },
  { id: 3, studentCode: "A003", studentName: "Sofía Rodríguez Silva", date: "2024-09-05", area: "Taller de Arte", description: "Exposición de pintura acuarela", responsible: "Prof. de Arte" },
  { id: 4, studentCode: "A004", studentName: "Diego Fernández Ruiz", date: "2024-09-07", area: "Deportes", description: "Participó en torneo de fútbol interno", responsible: "Prof. de Educación Física" },
  { id: 5, studentCode: "A005", studentName: "Valentina Gómez Díaz", date: "2024-09-08", area: "Laboratorio", description: "Experimento de ciclo del agua", responsible: "Prof. de Ciencias" },
];

export default function General() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mockRecords);

  useEffect(() => {
    const results = mockRecords.filter(
      (r) =>
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.studentCode.toLowerCase().includes(search.toLowerCase()) ||
        r.area.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            General
          </CardTitle>
          <Button variant="outline" onClick={() => alert("Registrar información general")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuevo Registro
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, código, área o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Código Estudiante</TableHead>
              <TableHead>Nombre Estudiante</TableHead>
              <TableHead className="w-20">Fecha</TableHead>
              <TableHead>Área/Actividad</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No se encontraron registros
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.studentCode}</TableCell>
                  <TableCell>{r.studentName}</TableCell>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.area}</TableCell>
                  <TableCell className="max-w-40 break-all">{r.description}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button variant="ghost" size="icon" aria-label="Ver detalle">
                      <ClipboardList className="h-4 w-4 text-primary" />
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
  );
}