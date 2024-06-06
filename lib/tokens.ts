import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-tokens";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const tokenExists = await getVerificationTokenByEmail(email);

  if (tokenExists) {
    await db.verificationToken.delete({
      where: {
        id: tokenExists.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
