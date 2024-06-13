import { title } from "@/components/primitives";
import TransactionList from "@/components/transactionlist";
import AddTransaction from "@/components/addtransaction";
import Summary from "@/components/summary";

export default function BlogPage() {
  return (
    <div className="w-full flex flex-col">
      <h1 className={title()}>Welcome, User!</h1>
      <div className="w-full flex flex-col md:flex-row m-12">
        <AddTransaction/>
        <TransactionList/>

      </div>
    </div>
  );
}
