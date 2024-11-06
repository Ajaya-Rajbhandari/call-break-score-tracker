import React from "react";
import styles from "../styles/AboutPage.module.css";
const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.cardHeader}>About Us</h1>
      <div className={styles.card}>
        <p>
          Welcome to our application! We are dedicated to providing the best
          experience for our users. Our team is passionate about creating
          innovative solutions that meet your needs.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver high-quality products that enhance the lives
          of our users. We strive for excellence in everything we do and are
          committed to continuous improvement.
        </p>

        <h2>Meet the Team</h2>
        <ul>
          <li>
            <strong>John Doe</strong> - Project Manager
          </li>
          <li>
            <strong>Jane Smith</strong> - Lead Developer
          </li>
          <li>
            <strong>Emily Johnson</strong> - UX/UI Designer
          </li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us at
          <a href="mailto:info@example.com"> info@example.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
