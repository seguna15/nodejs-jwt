import { Role } from "@prisma/client";
import { db } from "../utils/db.utils";



export const fetchUser = async (id: number) => {
    const result = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    return result;
}