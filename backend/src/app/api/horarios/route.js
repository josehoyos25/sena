import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
  return new NextResponse(error.message, { status: 500 });
};

export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id) || id <= 0) {
      return NextResponse.json({ error: 'ID de horario inválido' }, { status: 400 });
    }

    const horario = await prisma.horarios.findUnique({
      where: { id_horario: parseInt(params.id)},
      include: {
        Fichas: true,
        Ambientes: true,
        Vinculacion: {
          include: {
            Personas: {
              select: {
                id_persona: true,
                nombres: true,
              },
            },
          },
        },
      },
    });

    if (!horario) {
      return NextResponse.json({ error: 'Horario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(horario);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const horario = await prisma.horarios.create({
      data: {
        fecha_inicio: data.fecha_inicio,
        hora_inicio: data.hora_inicio,
        fecha_fin: data.fecha_fin,
        hora_fin: data.hora_fin,
        dia: data.dia,
        cantidad_horas: data.cantidad_horas,
        instructor: data.instructor,
        ficha: data.ficha,
        ambiente: data.ambiente,
      },
    });
    return new NextResponse(JSON.stringify(horario), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return handleErrors(error);
  }
}