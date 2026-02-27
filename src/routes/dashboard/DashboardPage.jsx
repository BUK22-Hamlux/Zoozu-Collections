import CartSummary from "../../components/Dashboard/CartSummary";
import WelcomeBanner from "../../components/Dashboard/WelcomeBanner";

function Dashboard() {
  return (
    <div className="px-4 py-8 space-y-8 max-w-7xl mx-auto">
      <WelcomeBanner />
      <CartSummary />
    </div>
  );
}

export default Dashboard;
