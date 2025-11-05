import Title from "@/components/Title";
import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

import image1 from "@/public/training-girl.jpg";
import image2 from "@/public/training-man.jpg";
import team1 from "@/public/team1.jpg";
import team2 from "@/public/team2.jpg";

import logo1 from "@/app/assets/fitbit.png";
import logo3 from "@/app/assets/nike.png";
import logo4 from "@/app/assets/ua.png";
import logo5 from "@/app/assets/spotify.png";
import logo6 from "@/app/assets/whoop.svg";

export default function AboutPage() {
  return (
    <div className={classes.about}>
      <Title>About DVeb Motion™</Title>

      <section className={classes.mission}>
        <div>
          <h2>Our Mission</h2>
          <p>
            DVeb Motion™ is redefining the fitness industry by bringing
            <strong> digital transformation </strong> to workouts, nutrition,
            and coaching. Our goal is to create a safe, accessible and
            personalized ecosystem for every fitness enthusiast.
          </p>
        </div>

        <div className={classes.wrapImage}>
          <Image
            src={image2}
            alt="Fitness training"
            fill
            style={{ objectFit: "cover", borderRadius: "20px" }}
          />
        </div>
      </section>

      <section className={classes.partners}>
        <div className="container">
          <div className={classes.logos}>
            <Image src={logo3} alt="" height={70} />
            <Image src={logo4} alt="" height={70} />
            <Image src={logo1} alt="" height={50} />
            <Image src={logo5} alt="spotify logo" height={70} />
            <Image src={logo6} alt="whoop logo" height={40} />
          </div>
        </div>
      </section>

      <section className={classes.vision}>
        <div className={classes.wrapImage}>
          <Image
            src={image1}
            alt="Fitness training"
            fill
            style={{ objectFit: "cover", borderRadius: "20px" }}
          />
        </div>
        <div>
          <h2>Our Vision</h2>
          <p>
            To build a <strong>long-term sustainable fitness ecosystem</strong>{" "}
            that empowers users worldwide through smart analytics, connected
            devices, and professional support.
          </p>
        </div>
      </section>

      <hr className={classes.divider} />

      <section className={classes.team}>
        <h2>Meet the Team</h2>
        <div className={classes.teamGrid}>
          <div className={classes.teamMember}>
            <Image src={team1} alt="John Doe" width={180} height={200} />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className={classes.teamMember}>
            <Image src={team2} alt="John Doe" width={180} height={200} />
            <h3>John Doe</h3>
            <p>Head of Training</p>
          </div>
          <div className={classes.teamMember}>
            <Image src={team1} alt="John Doe" width={180} height={200} />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className={classes.teamMember}>
            <Image src={team2} alt="John Doe" width={180} height={200} />
            <h3>John Doe</h3>
            <p>Head of Training</p>
          </div>
        </div>
      </section>

      <section className={classes.cta}>
        <h2>Work with us</h2>
        <p>
          Want to partner, join the team, or learn more? We'd love to hear from
          you.
        </p>
        <div className={classes.ctaButtons}>
          <Link href="/contact" className={classes.buttonPrimary}>
            Contact Us
          </Link>
          <Link href="/careers" className={classes.buttonSecondary}>
            Careers
          </Link>
        </div>
      </section>
    </div>
  );
}
