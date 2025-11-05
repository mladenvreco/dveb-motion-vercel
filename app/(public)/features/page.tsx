import React from "react";
import classes from "./page.module.css";
import Title from "@/components/Title";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  shortDescription: string;
  isPremium: boolean;
  detailedDescription: string;
}

const FeatureCard = ({
  icon,
  title,
  shortDescription,
  isPremium,
  detailedDescription,
}: FeatureCardProps & { isPremium?: boolean }) => (
  <div className={classes.card}>
    {isPremium && <span className={classes.premiumBadge}>Premium</span>}
    <div className={classes.icon}>{icon}</div>
    <h3>{title}</h3>
    <p className={classes.short}>{shortDescription}</p>
    <p className={classes.detailed}>{detailedDescription}</p>
  </div>
);

export default function FeaturesPage() {
  const workouts = [
    {
      icon: "🏋️",
      title: "Personalized Training Plans",
      shortDescription: "Tailored workouts for your goals",
      detailedDescription:
        "Full guidance, AI feedback, video tutorials, and progress tracking included.",
      isPremium: false,
    },
    {
      icon: "📺",
      title: "On-demand & Live Classes",
      shortDescription: "On-demand & live training sessions",
      detailedDescription:
        "Access a variety of live classes and on-demand content for all levels.",
      isPremium: true,
    },
    {
      icon: "🤖",
      title: "AI Coach & AR Motion Feedback",
      shortDescription: "Get real-time guidance",
      detailedDescription:
        "AI analyzes your form and provides detailed corrections to optimize performance.",
      isPremium: true,
    },
  ];

  const nutrition = [
    {
      icon: "🥗",
      title: "Meal Plans & Recipes",
      shortDescription: "Healthy recipes and meal plans",
      detailedDescription:
        "Personalized nutrition plans with detailed recipes for all dietary preferences.",
      isPremium: true,
    },
    {
      icon: "📊",
      title: "Macro & Calorie Tracking",
      shortDescription: "Track your macros and calories",
      detailedDescription:
        "Automatically track calories, macros, and micronutrients to meet your goals.",
      isPremium: true,
    },
    {
      icon: "💧",
      title: "Hydration & Sleep",
      shortDescription: "Monitor hydration and sleep",
      detailedDescription:
        "Keep track of water intake, sleep quality, and daily recovery recommendations.",
      isPremium: true,
    },
  ];

  const analytics = [
    {
      icon: "⏱️",
      title: "Real-time Tracking",
      shortDescription: "Steps, HR, GPS tracking",
      detailedDescription:
        "Full health tracking with real-time stats and visual dashboards.",
      isPremium: false,
    },
    {
      icon: "📈",
      title: "Health Dashboards",
      shortDescription: "Visualize your progress",
      detailedDescription:
        "Interactive dashboards with history, trends, and personalized insights.",
      isPremium: false,
    },
    {
      icon: "🧬",
      title: "Body Composition & DNA Insights",
      shortDescription: "Advanced analysis",
      detailedDescription:
        "Get insights on your body composition and personalized genetic recommendations.",
      isPremium: false,
    },
  ];

  const community = [
    {
      icon: "🏆",
      title: "Challenges & Leaderboards",
      shortDescription: "Compete and stay motivated",
      detailedDescription:
        "Join challenges, climb leaderboards, and engage with the community.",
      isPremium: true,
    },
    {
      icon: "💬",
      title: "Messaging & Social Feed",
      shortDescription: "Connect with trainers and friends",
      detailedDescription:
        "Send messages, share updates, and follow workouts from peers and experts.",
      isPremium: false,
    },
    {
      icon: "🎵",
      title: "Music Integration",
      shortDescription: "Train with Spotify",
      detailedDescription:
        "Seamlessly integrate your music for a fully immersive workout experience.",
      isPremium: false,
    },
  ];

  const integrations = [
    {
      icon: "🍏",
      title: "Apple Health & Google Fit",
      shortDescription: "Sync your devices",
      detailedDescription:
        "Automatic sync with Apple Health, Google Fit, and supported wearables.",
      isPremium: false,
    },
    {
      icon: "⌚",
      title: "Wearables & Multi-device Sync",
      shortDescription: "Track across devices",
      detailedDescription:
        "Connect smartwatches, phones, and tablets for unified tracking.",
      isPremium: false,
    },
    {
      icon: "📴",
      title: "Offline Mode",
      shortDescription: "Train without internet",
      detailedDescription:
        "Access workouts and logs even when offline, sync later automatically.",
      isPremium: true,
    },
  ];

  const featureSections = [
    { title: "Workouts", features: workouts, href: "/workouts" },
    { title: "Nutrition & Lifestyle", features: nutrition, href: "nutrition" },
    { title: "Analytics", features: analytics, href: "analytics" },
    { title: "Community & Engagement", features: community, href: "community" },
    { title: "Integrations", features: integrations, href: "integrations" },
  ];

  return (
    <>
      <Title>Features</Title>

      <section className={classes.hero}>
        <h2>Explore DVeb Motion™ Features</h2>
        <p>
          Discover the capabilities that will transform your fitness journey.
        </p>
        <div className={classes.heroCTA}>
          <Link href="/auth/register" className={classes.buttonPrimary}>
            Start Training Now
          </Link>
          <Link href="/auth/subscription" className={classes.buttonSecondary}>
            Upgrade to Premium
          </Link>
        </div>
      </section>

      {featureSections.map((section, idx) => (
        <section key={idx} className={classes.featuresSection}>
          <h2>{section.title}</h2>
          <div className={classes.featuresGrid}>
            {section.features.map((f, i) => (
              <FeatureCard
                key={i}
                icon={f.icon}
                title={f.title}
                shortDescription={f.shortDescription}
                detailedDescription={f.detailedDescription}
                isPremium={f.isPremium}
              />
            ))}
          </div>
          <Link href={section.href} className={classes.cardCTA}>
            Learn More
          </Link>
        </section>
      ))}
    </>
  );
}
