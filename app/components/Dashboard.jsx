import { AiOutlineCodeSandbox, AiOutlineWallet } from "react-icons/ai";
import Cards from "./Cards";
import { FiCheckCircle, FiStar } from "react-icons/fi";

export function Dashboard() {
    return (
        <div>
            <div className="grid grid-cols-4 gap-6">
                <Cards name="Total Earnings" value="₦145,000" short_txt="Available for instant payout" link={true} star={false} icon={<AiOutlineWallet className="text-blue-500" />} icon_bg="bg-blue-200/40 group-hover:bg-blue-200/80" />
                <Cards name="Completed Gigs" value="28" short_txt="100% on-time delivery" link={false} star={false} icon={<FiCheckCircle className="text-slate-900" />} icon_bg="bg-slate-200/40 group-hover:bg-slate-200/80"/>
                <Cards name="Active Gigs" value="4" short_txt="2 deliverables due this week" link={true} star={false} icon={<AiOutlineCodeSandbox className="text-slate-900" />} icon_bg="bg-slate-200/40 group-hover:bg-slate-200/80"/>
                <Cards name="Average Rating" value="4.9/5" short_txt="Based on 32 client reviews" link={true} star={true} icon={<FiStar className="text-yellow-600 fill-yellow-500" />} icon_bg="bg-yellow-200/40 group-hover:bg-yellow-200/80"/>
            </div>
        </div>
    );
}