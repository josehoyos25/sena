import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const handleErrors = (error) => {
return new NextResponse(error.message, { status: 500 });
};

const handleNotFound = () => {
return new NextResponse("Ambiente not found", { status: 404 });
};

export async function GET(request, { params }) {
try {
    const id = parseInt(params.id);
    const ambiente = await prisma.ambientes.findFirst({
    where: { id },
    include: {
        sede: true,
        estado: true,
    },
    });
    if (!ambiente) {
    return handleNotFound();
    }
    return NextResponse.json(ambiente);
} catch (error) {
    return handleErrors(error);
}
}

export async function DELETE(request, { params }) {
try {
    const id = parseInt(params.id);
    await prisma.ambientes.delete({ where: { id } });
    return NextResponse.json({ message: "Ambiente deleted successfully" }, { status: 200 });
} catch (error) {
    return handleErrors(error);
}
}

export async function PUT(request, { params }) {
try {
    const id = parseInt(params.id);
    const data = await request.json();
    const updatedAmbiente = await prisma.ambientes.update({
    where: { id },
    data: {
        nombre_amb: data.nombre_amb,
        municipio: data.municipio,
        sede: { connect: { id_sede: data.sedeId } },
        estado: { connect: { id_estado: data.estadoId } },
    },
    });
    return NextResponse.json({ message: "Ambiente updated successfully" }, { status: 200 });
} catch (error) {
    return handleErrors(error);
}
}