import React from 'react';
import { NavLink } from 'react-router-dom';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  altText: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Bishnu GC',
    position: 'Principal',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01910-scaled.jpg',
    altText: 'Bishnu GC'
  },
  {
    name: 'Dhruba Bandhu Rijal',
    position: 'Incharge',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01902-scaled.jpg',
    altText: 'Dhruba Bandhu Rijal'
  },
  {
    name: 'Daya Sagar Paudel',
    position: 'Coordinator',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-3.41.57-PM.jpeg',
    altText: 'Daya Sagar Paudel'
  },
  {
    name: 'Sunita Bhujel',
    position: 'Accountant',
    image: 'https://dhungesanghuschool.edu.np/wp-content/uploads/2026/04/DSC01609-scaled.jpg',
    altText: 'Sunita Bhujel'
  }
];

export const AcademicTeamSection: React.FC = () => {
  return (
    <section className="academy-team-section">
      <div className="academy-container">
        
        {/* TITLE */}
        <div className="academy-section-title">
          <h2>Our Academic Team</h2>
          <p>
            Meet our dedicated professionals at Dhungesanghu Boarding School.
            Our team blends experience and innovation for quality education.
          </p>
        </div>

        {/* TEAM GRID */}
        <div className="academy-team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="academy-team-member" style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={member.image} alt={member.altText} />
              <h3>{member.name}</h3>
              <span className="position">{member.position}</span>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="academy-btn-wrap">
          <NavLink to="/officials" className="academy-view-team-btn">
            View All Team
          </NavLink>
        </div>

      </div>
    </section>
  );
};
