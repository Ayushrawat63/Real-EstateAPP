
import './aboutPage.scss'; 

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Your trusted partner in real estate</p>
      </header>

      {/* Company Overview */}
      <section className="about-section company-overview">
        <h2>Company Overview</h2>
        <p>
          Established in 2005, XYZ Realty is dedicated to providing top-notch real estate services, 
          connecting people with their dream homes and investment opportunities. Our experienced team 
          has successfully managed over 5,000 property transactions, focusing on delivering value 
          and satisfaction to our clients.
        </p>
      </section>

      {/* Mission Section */}
      <section className="about-section mission">
        <h2>Our Mission</h2>
        <p>
          To empower individuals and families in their real estate journey, providing expertise, integrity, 
          and exceptional service every step of the way. At XYZ Realty, we strive to make homeownership and 
          investments accessible and fulfilling for everyone.
        </p>
      </section>

      {/* Services Section */}
      <section className="about-section services">
        <h2>Our Services</h2>
        <ul>
          <li>Residential Property Sales</li>
          <li>Commercial Property Leasing</li>
          <li>Property Management</li>
          <li>Real Estate Investment Consulting</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="about-section team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/images/team-member1.jpg" alt="John Doe" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="/images/team-member2.jpg" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Chief Operating Officer</p>
          </div>
          <div className="team-member">
            <img src="/images/team-member3.jpg" alt="Robert Brown" />
            <h3>Robert Brown</h3>
            <p>Head of Sales</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
