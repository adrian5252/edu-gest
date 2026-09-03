import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { GraduationCap, UserPlus, Users, BookOpen } from "lucide-react";

const mockStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A", average: 6.5, attendance: "95%" },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "2do", section: "B", average: 5.8, attendance: "90%" },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "3ro", section: "A", average: 6.2, attendance: "98%" },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C", average: 4.5, attendance: "80%" },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "2do", section: "A", average: 6.0, attendance: "92%" },
];

export default function Pedagogia() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mockStudents);

  useEffect(() => {
    const results = mockStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()) ||
        s.grade.toLowerCase().includes(search.toLowerCase()) ||
        s.section.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search]);

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Pedagogía
            </CardTitle>
            <Button variant="outline" onClick={() => alert("Registrar notas")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Registrar Notas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por código, nombre, grado o sección..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead className="w-16">Grado</TableHead>
                <TableHead className="w-16">Sección</TableHead>
                <TableHead className="w-20">Promedio</TableHead>
                <TableHead className="w-20">Asistencia</TableHead>
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
                filtered.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.code}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell className="text-center font-medium">{student.average}</TableCell>
                    <TableCell className="text-center">{student.attendance}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver expediente">
                        <Users className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Ingresar notas">
                        <BookOpen className="h-4 w-4 text-warning" />
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
          <CardTitle className="text-lg font-semibold">Resumen General</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="border p-4">
            <p className="text-sm font-medium text-gray-600">Total Alumnos</p>
            <p className="text-2xl font-bold">{mockStudents.length}</p>
          </div>
          <div className="border p-4">
            <p className="text-sm font-medium text-gray-600">Promedio General</p>
            <p className="text-2xl font-bold">
              {(mockStudents.reduce((sum, s) => sum + s.average, 0) / mockStudents.length).toFixed(2)}
            </p>
          </div>
          <div className="border p-4">
            <p className="text-sm font-medium text-gray-600">Asistencia Promedio</p>
            <p className="text-2xl font-bold">
              {Math.round(
                mockStudents.reduce((sum, s) => sum + parseInt(s.attendance), 0) /
                  mockStudents.length
              )}%
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}