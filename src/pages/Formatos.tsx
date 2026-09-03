import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, FileText, Printer, Search } from "lucide-react";

const mockStudents = [
  { id: 1, code: "A001", name: "Ana García López", grade: "1ro", section: "A" },
  { id: 2, code: "A002", name: "Luis Martínez Pérez", grade: "2do", section: "B" },
  { id: 3, code: "A003", name: "Sofía Rodríguez Silva", grade: "3ro", section: "A" },
  { id: 4, code: "A004", name: "Diego Fernández Ruiz", grade: "1ro", section: "C" },
  { id: 5, code: "A005", name: "Valentina Gómez Díaz", grade: "2do", section: "A" },
];

const formatTypes = [
  { value: "expediente", label: "Formato de Expediente Completo" },
  { value: "academico", label: "Reporte Académico" },
  { value: "conducta", label: "Reporte de Conducta" },
  { value: "psicologico", label: "Reporte Psicológico" },
  { value: "nutricional", label: "Plan Nutricional" },
  { value: "observaciones", label: "Reporte de Observaciones" },
  { value: "seguimiento", label: "Reporte de Seguimiento" },
  { value: "general", label: "Reporte General" },
];

export default function Formatos() {
  const [selectedStudent, setSelectedStudent] = useState<{ id: number; code: string; name: string; grade: string; section: string } | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("expediente");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStudents = mockStudents.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase()) ||
    s.section.toLowerCase().includes(search.toLowerCase())
  );

  const handleGeneratePDF = () => {
    if (!selectedStudent) {
      alert("Por favor seleccione un alumno");
      return;
    }
    // Simulate PDF generation
    setPreviewVisible(true);
    alert(`Generando PDF de ${selectedFormat} para ${selectedStudent.name}...`);
  };

  const handlePrint = () => {
    if (!previewVisible) {
      alert("Primero genere una vista previa");
      return;
    }
    // Simulate print
    window.print();
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Formatos e Impresión
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar alumno..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Seleccionar Alumno</p>
                <Select
                  value={selectedStudent?.id?.toString() ?? ""}
                  onValueChange={(v) => {
                    const s = filteredStudents.find((st) => st.id === Number(v));
                    setSelectedStudent(s ?? null);
                  }}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Seleccionar un alumno" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredStudents.map((s) => (
                      <SelectItem key={s.id} value={s.id.toString()}>
                        {s.code} - {s.name} ({s.grade}{s.section})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium text-gray-600">Seleccionar Tipo de Formato</p>
                <div className="space-y-2">
                  {formatTypes.map((fmt) => (
                    <div key={fmt.value} className="flex items-center space-x-3">
                      <Checkbox
                        checked={selectedFormat === fmt.value}
                        onCheckedChange={() => setSelectedFormat(fmt.value)}
                        className="h-4 w-4"
                      />
                      <span>{fmt.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setPreviewVisible(true)}>Vista Previa</Button>
            <Button onClick={handleGeneratePDF}>Generar PDF</Button>
            <Button variant="outline" onClick={handlePrint} disabled={!previewVisible}>
              Imprimir
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        {previewVisible && selectedStudent && (
          <Card className="mt-6">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">
                  Vista Previa: {selectedFormat === "expediente" ? "Formato de Expediente Completo" : selectedFormat}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setPreviewVisible(false)}>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="min-h-[400px] border p-4 text-center">
              <div className="text-gray-500">
                <p>Vista previa del formato seleccionado para:</p>
                <p className="font-bold">{selectedStudent.name}</p>
                <p className="text-sm">{selectedStudent.code} - {selectedStudent.grade}{selectedStudent.section}</p>
                <div className="mt-4 h-[300px] flex items-center justify-center border-dashed border-gray-300">
                  <span className="text-gray-400">[ Aquí se mostraría la vista previa del formato ]</span>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Nota: Esta es una simulación. En una implementación real, se generaría un PDF con los datos del alumno.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}