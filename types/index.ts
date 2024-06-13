import { EXPENSETYPES, INCOMETYPES, TRANSACTIONTYPES } from "@prisma/client";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Transaction {
  id: string;
  amount: number;
  date: string | Date;
  description: string;
  type: TRANSACTIONTYPES;
  userId: string;
  expensetype: EXPENSETYPES | undefined;
  incometype: INCOMETYPES | undefined;
}
