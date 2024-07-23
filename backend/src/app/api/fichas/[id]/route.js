import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

const handleNotFound = () => {
  return new NextResponse("Ficha not found", { status: 404 });
};

export async function GET(request, { params }) {
  try {
    const codigo = parseInt(params.codigo);
    const ficha = await prisma.fichas.findUnique({
      where: { codigo },
      include: {
        Programas: true, // Relación con Programas
      },
    });
    if (!ficha) {
      return handleNotFound();
    }
    return NextResponse.json(ficha);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const codigo = parseInt(params.codigo);
    const ficha = await prisma.fichas.delete({
      where: { codigo },
    });
    return NextResponse.json({ message: "Ficha deleted successfully", ficha }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const codigo = parseInt(params.codigo);
    const data = await request.json();
    const updatedFicha = await prisma.fichas.update({
      where: { codigo },
      data: {
        inicio_fecha: new Date(data.inicio_fecha), // Asegúrate de que las fechas se envíen correctamente
        fin_lectiva: new Date(data.fin_lectiva),
        fin_ficha: new Date(data.fin_ficha),
        programa: { connect: { id_programa: data.programa } }, // Conecta con el ID del programa
        sede: data.sede, // Enum directamente
        estado: data.estado, // Enum directamente
      },
    });
    return NextResponse.json({ message: "Ficha updated successfully", ficha: updatedFicha }, { status: 200 });
  } catch (error) {
    return handleErrors(error);
  }
}
