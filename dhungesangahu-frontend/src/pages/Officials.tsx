import React from 'react';
import { teamMembers } from '../components/AcademicTeamSection';

export const Officials: React.FC = () => {
  return (
    <div className="w-full flex flex-col font-sans">
      <section className="academy-team-section min-h-[calc(100vh-320px)] py-16 px-6">
        <div className="academy-container">
          
          {/* TITLE */}
          <div className="academy-section-title">
            <h2>School Officials</h2>
            <p>
              Meet the dedicated leadership and administrative team guiding Dhungesanghu Boarding School towards educational excellence.
            </p>
          </div>

          {/* TEAM GRID */}
          <div className="academy-team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="academy-team-member" style={{ animationDelay: `${index * 0.15}s` }}>
                <img src={member.image} alt={member.altText} />
                <h3>{member.name}</h3>
                <span className="position">{member.position}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
