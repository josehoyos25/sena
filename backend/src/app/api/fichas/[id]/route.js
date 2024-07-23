import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
}

export async function GET(request, { params }) {
  try {
    const codigo = parseInt(params.codigo);
    if (isNaN(codigo) || codigo <= 0) {
      return NextResponse.json({ error: 'Código de ficha inválido' }, { status: 400 });
    }

    const ficha = await prisma.fichas.findUnique({
      where: { codigo },
      include: {
        Programas: true, // Relación con Programas
      },
    });

    if (!ficha) {
      return NextResponse.json({ error: 'Ficha no encontrada' }, { status: 404 });
    }

    return NextResponse.json(ficha);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const codigo = parseInt(params.codigo);
    if (isNaN(codigo)) {
      return NextResponse.json({ error: "Código invalido" }, { status: 400 });
    }
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
