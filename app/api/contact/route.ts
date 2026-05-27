import { Resend } from "resend";

console.log("API KEY:");
console.log(process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { nombre, email, destino } = body;

    await resend.emails.send({

      from: "onboarding@resend.dev",

      to: "hcascopablo@gmail.com",

      subject: "Nueva reserva Patara",

      html: `
        <h1>Nueva reserva</h1>

        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Destino:</strong> ${destino}</p>
      `,
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      success: false,
    });

  }

}