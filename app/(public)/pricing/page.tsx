import Title from "@/components/Title";
import PricingCard from "./PricingCard";
import classes from "./page.module.css";

export default function PricingPage() {
  return (
    <>
      <Title>Plans & Pricing</Title>

      <div className={classes.pricingContainer}>
        {/* FREE PLAN */}
        <PricingCard
          packageName="Free Plan"
          description="Get started with basic workouts and community support"
          features={[
            "Access to All Basic Workouts",
            "Basic Nutrition Guidance",
            "Community Access",
          ]}
          monthlyPrice="Free"
          yearlyPrice=""
          buttonText="Start Free"
          buttonLink="/auth/register"
        />

        {/* BASIC PLAN */}
        <PricingCard
          packageName="Basic Plan"
          description="Unlock more workouts and sync your fitness devices"
          features={[
            "Workouts & Nutrition Plans",
            "Sync with Fitness Devices",
            "Access to Progress Charts",
            "Community Support",
          ]}
          monthlyPrice="9€"
          yearlyPrice="89€"
          buttonText="Upgrade to Basic"
          buttonLink="/account/subscription"
        />

        {/* PRO PLAN */}
        <PricingCard
          packageName="Pro Plan"
          description="Full access to all advanced analytics and personalized features"
          features={[
            "Advanced Analytics",
            "Personalized Nutrition & Workouts",
            "Offline Mode",
            "Integration with Wearables",
            "Priority Support",
          ]}
          monthlyPrice="19€"
          yearlyPrice="179€"
          buttonText="Upgrade to Pro"
          buttonLink="/account/subscription"
          isPremium
        />
      </div>
    </>
  );
}
