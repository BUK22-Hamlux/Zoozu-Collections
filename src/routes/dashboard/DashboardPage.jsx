import Button from "../../components/Common/Button";
import CartSummary from "../../components/Dashboard/CartSummary";
import RecentOrders from "../../components/Dashboard/RecentOrders";
import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-8 space-y-8 max-w-7xl mx-auto">
      <WelcomeBanner />
      <CartSummary />
      <RecentOrders />
      <div className="flex flex-col sm:flex-row gap-4 font-semibold w-full">
        <Button
          onClick={() => navigate("/cart")}
          type="primary"
          text="View Cart"
          optionalClassName="w-full"
        />
        <Button
          text="Continue Shopping"
          onClick={() => navigate("/products")}
          optionalClassName="w-full border border-text/20 bg-background hover:bg-section"
        />
      </div>
    </div>
  );
}

export default Dashboard;
