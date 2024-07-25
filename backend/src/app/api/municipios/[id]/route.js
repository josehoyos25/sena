import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
return new NextResponse(error.message, { status: 500 });
};

export async function GET(request, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id) || id <= 0) {
        return NextResponse.json({ error: 'ID de municipio inválido' }, { status: 400 });
      }
  
      const municipio = await prisma.municipios.findUnique({
        where: { id_municipio: parseInt(params.id)},
        include: {

        },
      });
  
      if (!municipio) {
        return NextResponse.json({ error: 'Municipio no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json(municipio);
    } catch (error) {
      return handleErrors(error);
    }
  }

  export async function DELETE(request, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)){
        return NextResponse.json({ error: 'ID de municipio inválido' }, { status: 400 });
      }
      const ambiente = await prisma.municipios.delete({
        where: { id_municipio: parseInt(params.id) },
      })
      return NextResponse.json({ message: "Municipio eliminado",ambiente }, { status: 200 });
    } catch (error) {
      return handleErrors(error);
    }
  }

export async function PUT(request, { params }) {
try {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedAmbiente = await prisma.municipios.update({
    where: { id_municipio: parseInt(params.id) },
    data: {
        nombre_mpio: data.nombre_mpio,
        departamento: data.departamento,
    },
    });
    return NextResponse.json({ message: "Municipio Actualizado" }, { status: 200 });
} catch (error) {
    return handleErrors(error);
}
}