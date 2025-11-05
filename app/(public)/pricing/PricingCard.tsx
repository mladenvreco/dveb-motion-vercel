import React from "react";
import styles from "./pricingcard.module.css";

interface PricingCardProps {
  packageName: string;
  description: string;
  features: string[];
  monthlyPrice: string;
  yearlyPrice?: string;
  buttonText: string;
  buttonLink: string;
  isPremium?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  packageName,
  description,
  features,
  monthlyPrice,
  yearlyPrice,
  buttonText,
  buttonLink,
  isPremium = false,
}) => {
  return (
    <div className={`${styles.card} ${isPremium ? styles.premium : ""}`}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <span className="gagalin">{packageName}</span>
        </h2>
        <p className={styles.description}>{description}</p>
        <ul className={styles.features}>
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className={styles.footer}>
        <div className={styles.prices}>
          {monthlyPrice !== "Free" && (
            <span>
              <span className={styles.priceAmount}>{monthlyPrice}</span>
              <span className={styles.pricePeriod}>/Month</span>
            </span>
          )}
          {yearlyPrice && (
            <span>
              <span className={styles.priceAmount}>{yearlyPrice}</span>
              <span className={styles.pricePeriod}>/Year</span>
            </span>
          )}
        </div>
        <a href={buttonLink} className={styles.button}>
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default PricingCard;
