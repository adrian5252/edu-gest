import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, GraduationCap, Stethoscope, Droplet, HandHeart, Activity, ClipboardList, FileText, Settings } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [stats] = useState([
    { title: "Total Alumnos", value: 124, icon: Users, color: "primary" },
    { title: "Etapa Cognitiva", value: 45, icon: BookOpen, color: "success" },
    { title: "Etapa II", value: 79, icon: BookOpen, color: "info" },
    { title: "Expedientes Activos", value: 124, icon: FileText, color: "warning" },
    { title: "Pedagogía", value: 124, icon: GraduationCap, color: "primary" },
    { title: "Psicología", value: 23, icon: Stethoscope, color: "destructive" },
    { title: "Nutrición", value: 34, icon: Droplet, color: "success" },
    { title: "Trabajo Social", value: 18, icon: HandHeart, color: "info" },
    { title: "Conducta", value: 42, icon: Activity, color: "warning" },
    { title: "General", value: 124, icon: ClipboardList, color: "secondary" },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                </div>
                <div className="flex-shrink-0">
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-2xl font-bold text-gray-900">{stat.value}</CardContent>
          </Card>
        ))}
      </div>
      <div className="border-t pt-6">
        <h2 className="text-lg font-semibold mb-4">Accesos rápidos</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Users className="mr-3 h-5 w-5" />
            <span>Gestión de Alumnos</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <BookOpen className="mr-3 h-5 w-5" />
            <span>Etapas Académicas</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Stethoscope className="mr-3 h-5 w-5" />
            <span>Psicología</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Droplet className="mr-3 h-5 w-5" />
            <span>Nutrición</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <HandHeart className="mr-3 h-5 w-5" />
            <span>Trabajo Social</span>
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-start px-4 py-3">
            <Settings className="mr-3 h-5 w-5" />
            <span>Administración</span>
          </Button>
        </div>
      </div>
    </div>
  );
}