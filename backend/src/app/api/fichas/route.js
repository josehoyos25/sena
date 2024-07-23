import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
return new NextResponse(error.message, { status: 500 });
};

export async function GET() {
try {
    const fichas = await prisma.fichas.findMany({
    include: {
        Programas: true, // Relación con Programas
        // Nota: "estado" y "sede" ya son enums, no modelos relacionados, así que no se necesitan incluir aquí
    },
    });
    return NextResponse.json({ datos: fichas }, { status: 200 });
} catch (error) {
    return handleErrors(error);
}
}

export async function POST(request) {
try {
    const data = await request.json();
    const ficha = await prisma.fichas.create({
    data: {
        inicio_fecha: new Date(data.inicio_fecha), // Asegúrate de que estas fechas se envíen correctamente
        fin_lectiva: new Date(data.fin_lectiva),
        fin_ficha: new Date(data.fin_ficha),
        programa: { connect: { id_programa: data.programa } },
        sede: data.sede, // Se usa directamente porque es un enum
        estado: data.estado, // Se usa directamente porque es un enum
    },
    });
    return new NextResponse(JSON.stringify(ficha), {
    headers: { "Content-Type": "application/json" },
    status: 201,
    });
} catch (error) {
    return handleErrors(error);
}
}
