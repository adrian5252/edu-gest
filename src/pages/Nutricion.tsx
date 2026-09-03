import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Droplet, UserPlus } from "lucide-react";

const mockPlans = [
  { id: 1, studentCode: "A001", studentName: "Ana García López", date: "2024-09-01", plan: "Desayuno: leche, pan integral, fruta; Almuerzo: proteína, verduras, arroz; Cena: sopa ligera, yogur", observations: "Come bien, le gusta la fruta", responsible: "Nutricionista Ruiz" },
  { id: 2, studentCode: "A002", studentName: "Luis Martínez Pérez", date: "2024-09-05", plan: "Desayuno: yogur, granola, miel; Almuerzo: pescado, ensalada, papas; Cena: puré de verduras, fruta", observations: "Requiere supervisión en almuerzo", responsible: "Nutricionista Ruiz" },
  { id: 3, studentCode: "A003", studentName: "Sofía Rodríguez Silva", date: "2024-08-20", plan: "Desayuno: huevo, tortilla, jugo natural; Almuerzo: pollo, arroz, vegetales; Cena: lentejas, pan, fruta", observations: "Sin observaciones", responsible: "Nutricionista Ruiz" },
  { id: 4, studentCode: "A004", studentName: "Diego Fernández Ruiz", date: "2024-09-10", plan: "Desayuno: leche, galletas integrales, plátano; Almuerzo: carne magra, quinoa, verduras; Cena: crema de verduras, yogur", observations: "Mejoró el apetito", responsible: "Nutricionista Ruiz" },
  { id: 5, studentCode: "A005", studentName: "Valentina Gómez Díaz", date: "2024-08-30", plan: "Desayuno: avena, leche, nueces; Almuerzo: pescado al vapor, ensalada, batata; Cena: sopa de pollo, fruta", observations: "Le encanta la fruta", responsible: "Nutricionista Ruiz" },
];

export default function Nutricion() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(mockPlans);

  useEffect(() => {
    const results = mockPlans.filter(
      (p) =>
        p.studentName.toLowerCase().includes(search.toLowerCase()) ||
        p.studentCode.toLowerCase().includes(search.toLowerCase()) ||
        p.plan.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search]);

  // Compute latest date for summary
  const latestDate = mockPlans.reduce((latest, plan) => {
    const planDate = new Date(plan.date);
    return planDate > latest ? planDate : latest;
  }, new Date(0));
  const latestDateString = latestDate > new Date(0) ? latestDate.toLocaleDateString() : "N/A";

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center">
              <Droplet className="mr-2 h-5 w-5" />
              Nutrición
            </CardTitle>
            <Button variant="outline" onClick={() => alert("Registrar plan nutricional")}>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuevo Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, código o plan..."
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
                <TableHead className="w-20">Fecha Plan</TableHead>
                <TableHead>Plan Nutricional</TableHead>
                <TableHead>Observaciones</TableHead>
                <TableHead className="w-24">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    No se encontraron planes
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.studentCode}</TableCell>
                    <TableCell>{p.studentName}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell className="max-w-40 break-all">{p.plan}</TableCell>
                    <TableCell className="max-w-40 break-all">{p.observations}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Ver plan">
                        <Droplet className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Editar plan">
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
          <CardTitle className="text-lg font-semibold">Resumen de Planes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Total Planes</p>
            <p className="text-2xl font-bold">{mockPlans.length}</p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Alumnos con Plan</p>
            <p className="text-2xl font-bold">
              {new Set(mockPlans.map((p) => p.studentCode)).size}
            </p>
          </div>
          <div className="border p-4 text-center">
            <p className="text-sm font-medium text-gray-600">Última Actualización</p>
            <p className="text-2xl font-bold">{latestDateString}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}